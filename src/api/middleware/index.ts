import helmet from 'helmet';

import { json, Request, Response, Router } from 'express';

import { useUtilityService } from '../services/utility';

export function registerMiddleware(router: Router): void {
	router.use(helmet());
	router.use(json());

	// TODO: Setup passport strategies
}

export function registerErrorHandler(router: Router): Response | void {
	router.use((err: Error, _: Request, res: Response) => {
		useUtilityService().handleError(err);

		return res.status(500).json({
			error: err.message || err,
			status: 500
		});
	});
}
