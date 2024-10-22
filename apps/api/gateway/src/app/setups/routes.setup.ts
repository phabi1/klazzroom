import { Application, Request, Response, Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import pluginManager from '../services/plugin-manager';

class Context {
  private _hooks: Record<string, { handle: () => void; priority?: number }[]> =
    {};
  register(hook: string, handler: any) {
    if (!this._hooks[hook]) {
      this._hooks[hook] = [];
    }
    this._hooks[hook].push(handler);
  }
  call(hook: string): any[] {
    const handlers = this._hooks[hook].sort((a, b) => {
      const p1 = a.priority || 0;
      const p2 = b.priority || 0;
      return p1 - p2;
    });

    const middlewares = [];
    for (const handler of handlers) {
      middlewares.push(handler.handle);
    }
    return middlewares;
  }
}

export default async function (app: Application) {
  const { Route: RouteModel, Service: ServiceModel } = app.get('models');

  const routes = await RouteModel.find();
  const services = await ServiceModel.find();

  for (const route of routes) {
    const ctx = new Context();

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

    const plugins = [];
    for (const pluginInfo of plugins) {
      const plugin = pluginManager.resolve(pluginInfo.name);
      await plugin.load(ctx, pluginInfo.options);
    }

    const middlewares = [];

    const mids = ctx.call('auth');
    mids.forEach((mid) => middlewares.push(mid));

    const router = Router();

    middlewares.push(proxy);

    if (route.methods && route.methods !== '*') {
      const methods = Array.isArray(route.methods)
        ? route.methods
        : [route.methods];
      for (const method of methods) {
        const m = method.toLoawerCase();
        router[m](route.path, ...middlewares);
      }
    } else {
      router.all(route.path, ...middlewares);
    }

    app.use(router);
  }
}
