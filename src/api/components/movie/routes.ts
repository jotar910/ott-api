import { IRouter, Router } from 'express';
import { param, query } from 'express-validator';
import { MovieCreationClassDTO } from '../../dtos/movie/movie-creation';
import { useAccountService } from '../../services/account';
import { AuthService, useAuthService } from '../../services/auth';
import { useUtilityService } from '../../services/utility';
import { useValidatorService } from '../../services/validator';

import { IComponentRoutes } from '../helper';
import { UserDAO } from '../user/repository';
import { MovieController } from './controller';
import { MovieDAO } from './repository';

export class MovieRoutes implements IComponentRoutes<MovieController> {
    readonly router: IRouter = Router();
    readonly controller: MovieController;
    private readonly authService: AuthService;

    constructor(prefix: string, movieDAO: MovieDAO, userDAO: UserDAO) {
        this.controller = new MovieController(movieDAO);
        this.authService = useAuthService(userDAO);
        this.initRoutes(prefix);
    }

    initRoutes(prefix: string): void {
        this.router.use(this.authService.isAuthorized);
        this.router.get(
            `${prefix}/`,
            param('accountId').isNumeric(),
            query('page').default(1).isInt({ min: 1 }),
            query('limit').default(50).isInt({ min: 0, max: 200 }),
            useValidatorService().validateRequest,
            useAccountService().isAuthorized('accountId'),
            this.controller.getMovies
        );
        this.router.post(
            `${prefix}/`,
            param('accountId').isNumeric(),
            useValidatorService().validateRequest,
            useAccountService().isAuthorized('accountId'),
            useAccountService().hasWriteAccess,
            useValidatorService().validateRequestBody(MovieCreationClassDTO),
            this.controller.createMovie
        );
        this.router.get(
            `${prefix}/:movieId`,
            param('accountId').isNumeric(),
            param('movieId').isNumeric(),
            useValidatorService().validateRequest,
            useAccountService().isAuthorized('accountId'),
            useUtilityService().nonNullableJSONResponse,
            this.controller.getMovie
        );
        this.router.put(
            `${prefix}/:movieId`,
            param('accountId').isNumeric(),
            param('movieId').isNumeric(),
            useValidatorService().validateRequest,
            useAccountService().isAuthorized('accountId'),
            useAccountService().hasWriteAccess,
            useValidatorService().validateRequestBody(MovieCreationClassDTO, ['movie/optional']),
            useUtilityService().nonNullableJSONResponse,
            this.controller.updateMovie
        );
        this.router.delete(
            `${prefix}/:movieId`,
            param('accountId').isNumeric(),
            param('movieId').isNumeric(),
            useValidatorService().validateRequest,
            useAccountService().isAuthorized('accountId'),
            useAccountService().hasWriteAccess,
            useUtilityService().nonNullableJSONResponse,
            this.controller.deleteMovie
        );
    }
}