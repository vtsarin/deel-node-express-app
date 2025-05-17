import profileRoutes from './profile-routes.js';
import healthRoutes from './health-routes.js';
import logger from '../utils/logger.js';

class RouteManager {
  routes = [];

  constructor() {
    this.routes = [
      {
        path: '/api/health',
        router: healthRoutes
      },
      {
        path: '/api/profiles',
        router: profileRoutes
      }
    ];
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
export default new RouteManager(); 