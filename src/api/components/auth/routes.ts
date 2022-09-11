import { Router } from 'express';

import { LoginClassDTO } from '../../dtos/auth/login';
import { useValidatorService } from '../../services/validator';

import { IComponentRoutes } from '../helper';
import { UserDAO } from '../user/repository';

import { AuthController } from './controller';

export class AuthRoutes implements IComponentRoutes<AuthController> {
	readonly router: Router = Router();
	readonly controller: AuthController;

	constructor(prefix: string, userDAO: UserDAO) {
		this.controller = new AuthController(userDAO);
		this.initRoutes(prefix);
	}

	initRoutes(prefix: string): void {
		this.router.post(
			`${prefix}/login`,
			useValidatorService().validateRequestBody(LoginClassDTO),
			this.controller.loginUser
		);
	}
}
