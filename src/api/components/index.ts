import { Router } from 'express';
import { MovieRoutes } from './movie/routes';

export function registerApiRoutes(router: Router, prefix = ''): void {
	router.use(`${prefix}/:accountId/movies`, new MovieRoutes().router);
}