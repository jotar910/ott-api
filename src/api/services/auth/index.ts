import { bind, memoize } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';

import { UserDAO } from '../../components/user/repository';
import { JwtStrategy } from './strategies/jwt';

export class AuthService {
	private readonly strategyOptions: StrategyOptions = {
		audience: 'ott-api-client',
		issuer: 'ott-api',
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		passReqToCallback: true,
		secretOrKey: 'my-secret-key' // TODO: replace with a more secure approach.
	};

	private readonly signOptions: SignOptions = {
		audience: this.strategyOptions.audience,
		expiresIn: '8h',
		issuer: this.strategyOptions.issuer
	};

	private readonly jwtStrategy: JwtStrategy;

	private constructor(userDAO: UserDAO) {
		this.jwtStrategy = JwtStrategy.getInstance(userDAO, this.strategyOptions);
	}

	@memoize
	static getInstance(userDAO: UserDAO): AuthService {
		return new AuthService(userDAO);
	}

	@bind
	createToken(userID: number): string {
		return sign({ userID }, this.strategyOptions.secretOrKey as string, this.signOptions);
	}

	@bind
	isAuthorized(req: Request, res: Response, next: NextFunction) {
		try {
			return this.jwtStrategy.isAuthorized(req, res, next);
		} catch (err) {
			return next(err);
		}
	}
}

export const useAuthService = AuthService.getInstance;
