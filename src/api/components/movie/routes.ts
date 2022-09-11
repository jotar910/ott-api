import { IRouter, Router } from 'express';
import { param, query } from 'express-validator';
import { MovieCreationClassDTO } from '../../dtos/movie/movie-creation';
import { useUtilityService } from '../../services/utility';
import { useValidatorService } from '../../services/validator';

import { IComponentRoutes } from '../helper';
import { MovieController } from './controller';
import { MovieDAO, MovieMockRepository } from './repository';

export class MovieRoutes implements IComponentRoutes<MovieController> {
    readonly router: IRouter = Router();
    readonly controller: MovieController = new MovieController(
        new MovieDAO(
            new MovieMockRepository()
        )
    );

    constructor() {
        this.initRoutes();
    }

    initRoutes(): void {
        this.router.get(
            '/',
            query('page').default(1).isInt({ min: 1 }),
            query('limit').default(50).isInt({ min: 0, max: 200 }),
            useValidatorService().validateRequest,
            this.controller.getMovies
        );
        this.router.post(
            '/',
            useValidatorService().validateRequestBody(MovieCreationClassDTO),
            this.controller.createMovie
        );
        this.router.get(
            '/:movieId',
            param('movieId').isNumeric(),
            useValidatorService().validateRequest,
            useUtilityService().nonNullableJSONResponse,
            this.controller.getMovie
        );
        this.router.put(
            '/:movieId',
            param('movieId').isNumeric(),
            useValidatorService().validateRequest,
            useValidatorService().validateRequestBody(MovieCreationClassDTO, ['movie/optional']),
            useUtilityService().nonNullableJSONResponse,
            this.controller.updateMovie
        );
        this.router.delete(
            '/:movieId',
            param('movieId').isNumeric(),
            useValidatorService().validateRequest,
            useUtilityService().nonNullableJSONResponse,
            this.controller.deleteMovie
        );
    }
}