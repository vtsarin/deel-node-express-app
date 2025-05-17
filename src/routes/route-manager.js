import { routes } from './routes-config.js';
import logger from '../utils/logger.js';

class RouteManager {
  constructor(routes) {
    this.routes = routes;
  }

  /**
   * Register all routes with the Express application
   * @param {import('express').Application} app - Express application instance
   */
  registerRoutes(app) {
    this.routes.forEach(({ path, router }) => {
      app.use(path, router);
      logger.info(`Registered routes for path: ${path}`);
    });
  }
}

// Export a singleton instance
export default new RouteManager(routes); 