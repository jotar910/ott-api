import { Router } from 'express';

import { LoginClassDTO } from '../../dtos/auth/login';
import { useValidatorService } from '../../services/validator';

import { IComponentRoutes } from '../helper';
import { UserDAO } from '../user/repository';

import { AuthController } from './controller';

export class AuthRoutes implements IComponentRoutes<AuthController> {
	readonly router: Router = Router();
	readonly controller: AuthController;

	constructor(userDAO: UserDAO) {
		this.controller = new AuthController(userDAO);
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.post(
			'/login',
			useValidatorService().validateRequestBody(LoginClassDTO),
			this.controller.loginUser
		);
	}
}
