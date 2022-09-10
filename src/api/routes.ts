import { Request, Response, Router } from 'express';
import { registerApiRoutes } from './components';
import { registerErrorHandler, registerMiddleware } from './middleware';

export function initRestRoutes(router: Router): void {
    const prefix = '/v1/ott';

    router.get(prefix, (_: Request, res: Response) => res.send('OK'));

    registerMiddleware(router);
    registerApiRoutes(router, prefix);
    registerErrorHandler(router);
}
