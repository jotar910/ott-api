import { Router } from 'express';

import { AuthRoutes } from './auth/routes';
import { MovieDAO, MovieMockRepository } from './movie/repository';
import { MovieRoutes } from './movie/routes';
import { UserDAO, UserMockRepository } from './user/repository';

export function registerApiRoutes(router: Router, prefix = ''): void {
	const userDAO = new UserDAO(new UserMockRepository());
	const movieDAO = new MovieDAO(new MovieMockRepository());

	router.use(new AuthRoutes(`${prefix}/auth`, userDAO).router);
	router.use(new MovieRoutes(`${prefix}/:accountId/movies`, movieDAO, userDAO).router);
}