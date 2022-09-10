import { NextFunction, Request, Response } from 'express';
import { bind } from 'decko';

import { MovieDAO } from './repository';

export class MovieController {

    constructor(private readonly dao: MovieDAO) { }

    @bind
    async getMovies(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { page, limit } = req.query;
            return res.json(await this.dao.getList(+page!, +limit!));
        } catch (err) {
            return next(err);
        }
    }

    @bind
    async getMovie(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.json({});
        } catch (err) {
            return next(err);
        }
    }

    @bind
    async createMovie(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.json({});
        } catch (err) {
            return next(err);
        }
    }

    @bind
    async updateMovie(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.json({});
        } catch (err) {
            return next(err);
        }
    }

    @bind
    async deleteMovie(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.json({});
        } catch (err) {
            return next(err);
        }
    }
}