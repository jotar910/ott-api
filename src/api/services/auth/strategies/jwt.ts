import { bind, memoize } from 'decko';
import { Handler, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';

import { JwtPayload } from '../../../components/auth/helper';
import { UserDAO } from '../../../components/user/repository';

export class JwtStrategy {

	private readonly strategy: Strategy;

	private constructor(
		private readonly userDAO: UserDAO,
		private readonly strategyOptions: StrategyOptions
	) {
		this.strategy = new Strategy(this.strategyOptions, this.verify);
	}

	@memoize
	static getInstance(
		userDAO: UserDAO,
		strategyOptions: StrategyOptions
	): JwtStrategy {
		return new JwtStrategy(userDAO, strategyOptions);
	}

	isAuthorized(req: Request, res: Response, next: NextFunction): Handler | void {
		try {
			passport.authenticate(this.strategy, { session: false }, (err, user: JwtPayload, info) => {
				if (err) {
					return next(err);
				}

				if (info) {
					switch (info.message) {
						case 'No auth token':
							return res.status(401).json({
								error: 'No jwt provided!'
							});

						case 'jwt expired':
							return res.status(401).json({
								error: 'Jwt expired!'
							});
					}
				}

				if (!user) {
					return res.status(401).json({
						error: 'User is not authorized!'
					});
				}

				req.user = user; // success - store user in request scope

				return next();
			})(req, res, next);
		} catch (err) {
			return next(err);
		}
	}

	@bind
	private async verify(_: Request, { userID }: JwtPayload, next: VerifiedCallback): Promise<void> {
		try {
			const user = await this.userDAO.readById(userID);
			
			if (!user) {
				return next(null, null);
			}

			return next(null, user);
		} catch (err) {
			return next(err);
		}
	}
}
