import { NextFunction, Request, Response } from "express";
import { bind } from 'decko';

export class MovieController {
    @bind
    async readMovies(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.json([]);
        } catch (err) {
            return next(err);
        }
    }
}