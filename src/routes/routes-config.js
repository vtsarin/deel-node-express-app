import profileRoutes from './profile-routes.js';
import healthRoutes from './health-routes.js';
import { contractRouter } from './contract-routes.js';
import { jobRouter } from './job-routes.js';

export const routes = [
  {
    path: '/api/health',
    router: healthRoutes
  },
  {
    path: '/api/profiles',
    router: profileRoutes
  },
  {
    path: '/api/contracts',
    router: contractRouter
  },
  {
    path: '/api/jobs',
    router: jobRouter
  }
]; 