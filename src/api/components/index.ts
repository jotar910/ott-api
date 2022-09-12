import { Router } from 'express';
import { useDataSource } from '../services/data-source';

import { AuthRoutes } from './auth/routes';
import { Movie } from './movie/model';
import { MovieDAO } from './movie/repository';
import { MovieRoutes } from './movie/routes';
import { Users } from './user/model';
import { UserDAO } from './user/repository';

export function registerApiRoutes(router: Router, prefix = ''): void {
	const userDAO = new UserDAO(useDataSource().getRepository(Users));
	const movieDAO = new MovieDAO(useDataSource().getRepository(Movie));

	router.use(new AuthRoutes(`${prefix}/auth`, userDAO).router);
	router.use(new MovieRoutes(`${prefix}/:accountId/movies`, movieDAO, userDAO).router);
}