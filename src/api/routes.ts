import { Request, Response, Router } from 'express';

export function initRestRoutes(router: Router): void {
    const prefix: string = '/api/v1';

    router.get(prefix, (_: Request, res: Response) => res.send('PING'));

    // TODO: register middleware
    // TODO: register API routes
    // TODO: register error handler
}
