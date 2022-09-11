import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { useAuthService } from '../../services/auth';
import { useUtilityService } from '../../services/utility';
import { UserMapper } from '../user/mapper';
import { User } from '../user/model';
import { UserDAO } from '../user/repository';

export class AuthController {
	constructor(private readonly userDAO: UserDAO) { }

	@bind
	async loginUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, password } = req.body;

			const user: User | null = await this.userDAO.readByEmail(email);

			if (!user || !(await useUtilityService().verifyPassword(password, user.password))) {
				return res.status(401).json({ status: 401, error: 'Wrong email or password' });
			}

			// Create jwt -> required for further requests
			const token: string = useAuthService(this.userDAO).createToken(user.id);

			return res.json({ token, user: UserMapper.toDTO(user) });
		} catch (err) {
			return next(err);
		}
	}
}
