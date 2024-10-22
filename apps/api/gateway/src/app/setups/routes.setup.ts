import { IPlugin, PluginHook } from '@klazzroom/libs-api-gateway-plugin';
import { Application, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { IRoute } from '../models/route.model';
import pluginManager from '../services/plugin-manager';

function callHooks(name: string, plugins: IPlugin<unknown>[]): PluginHook[] {
  const hooks = [];

  plugins.forEach((plugin) => {
    const pluginHooks = plugin.getHooks(name);
    pluginHooks.forEach((hook) => {
      hooks.push(hook);
    });
  });

  hooks.sort((a, b) => (a.priority || 0) - (b.priority || 0));
  return hooks;
}

function printRoute(
  route: IRoute,
  plugins: IPlugin<unknown>[],
  method = 'ALL'
) {
  if (plugins.length === 0) {
    console.log(
      `Registering route ${method} ${route.path} for service ${route.serviceId} with no plugins`
    );
  } else {
    console.log(
      `Registering route ${method} ${route.path} for service ${
        route.serviceId
      } with plugins ${plugins.map((p) => p.name).join(', ')}`
    );
  }
}

export default async function (app: Application) {
  const {
    Route: RouteModel,
    Service: ServiceModel,
    Plugin: PluginModel,
  } = app.get('models');

  const routes: IRoute[] = await RouteModel.find();
  const services = await ServiceModel.find();
  const plugins = await PluginModel.find();

  for (const route of routes) {
    const service = services.find((service) => service.id === route.serviceId);
    if (!service) {
      throw new Error(
        `Service ${route.serviceId} not found for route ${route.id}`
      );
    }

    const proxy = createProxyMiddleware<Request, Response>({
      target: service.target,
      changeOrigin: true,
      pathRewrite: {
        ['^' + route.path]: '',
      },
    });

    const routePlugins = [...plugins, ...(route.plugins || [])];

    const _plugins = [];
    for (const pluginInfo of routePlugins) {
      const plugin = await pluginManager.resolve(pluginInfo.name);
      _plugins.push(plugin);
      plugin.app = app;
      await plugin.load(pluginInfo.options);
    }
    const pipeline = [];

    for (const hook of callHooks('auth', _plugins)) {
      pipeline.push(hook.handler);
    }

    pipeline.push((req: Request) => {
      req.headers['x-user-id'] = req.user?.id;
    });

    for (const hook of callHooks('request', _plugins)) {
      pipeline.push(hook.handler);
    }

    pipeline.push(proxy);

    for (const hook of callHooks('response', _plugins)) {
      pipeline.push(hook.handler);
    }

    if (route.methods && route.methods.length > 0) {
      for (const method of route.methods) {
        const m = method.toLowerCase();
        app[m](route.path, ...pipeline);
        printRoute(route, routePlugins, method);
      }
    } else {
      app.all(route.path, ...pipeline);
      printRoute(route, routePlugins);
    }
  }
}
