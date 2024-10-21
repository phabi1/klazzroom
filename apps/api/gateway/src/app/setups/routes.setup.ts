import { Application, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default async function (app: Application) {
  const { Route: RouteModel, Service: ServiceModel } = app.get('models');

  const routes = await RouteModel.find();
  const services = await ServiceModel.find();

  routes.forEach((route) => {
    const service = services.find((service) => service.id === route.serviceId);
    if (!service) {
      throw new Error(
        `Service ${route.serviceId} not found for route ${route.id}`
      );
    }
    console.log(route.path, service.target);
    const proxy = createProxyMiddleware<Request, Response>({
      target: service.target,
      changeOrigin: true,
      pathRewrite: {
        ['^' + route.path]: '',
      },
    });
    app.all(route.path, proxy);
  });
}
