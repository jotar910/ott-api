import helmet from 'helmet';

import { json, Request, Response, Router } from 'express';

import { useUtilityService } from '../services/utility';

export function registerMiddleware(router: Router): void {
	router.use(helmet());
	router.use(json());
}

export function registerErrorHandler(router: Router): Response | void {
	router.use((err: Error, _: Request, res: Response) => {
		useUtilityService().handleError(err);
		res.status(500)
		res.render('error', { error: err })
	});
}
