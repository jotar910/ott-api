import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { MovieMapper } from './mapper';

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
    async getMovie(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.json(await this.dao.get(+req.params.movieId));
        } catch (err) {
            return next(err);
        }
    }

    @bind
    async createMovie(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.json(await this.dao.create(MovieMapper.fromCreationToDTO(req.body)));
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