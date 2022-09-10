import { Request, Response, Router } from 'express';
import { registerApiRoutes } from './components';

export function initRestRoutes(router: Router): void {
    const prefix: string = '/api/v1';

    router.get(prefix, (_: Request, res: Response) => res.send('OK'));

    // TODO: register middleware
    // TODO: register API routes
    registerApiRoutes(router, prefix);
    // TODO: register error handler
}
