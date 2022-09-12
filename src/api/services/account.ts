import { bind, memoize } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { Users } from '../components/user/model';

export class AccountService {
    private constructor() {
        // Empty by design.
    }

    @memoize
    static getInstance(): AccountService {
        return new AccountService();
    }

    @bind
    isAuthorized(param: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = this.getUserFromReq(req);
                const accountId = this.getAccountIdFromReq(req, param);
                if (user.role.name !== 'Admin' && user.account.id !== accountId) {
                    return res.status(403).json({ error: 'You can only access content from your account' });
                }
                return next();
            } catch (err) {
                return next(err);
            }
        }
    }

    @bind
    hasWriteAccess(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getUserFromReq(req);
            if (user.role.name !== 'Admin') {
                return res.status(403).json({ error: 'You can only read content' });
            }
            return next();
        } catch (err) {
            return next(err);
        }
    }

    private getUserFromReq(req: Request): Users {
        if (!req.user) {
            throw new Error('Unable to identify user');
        }
        return req.user as Users;
    }

    private getAccountIdFromReq(req: Request, param: string): number {
        if (!req.params[param] || isNaN(+req.params[param])) {
            throw new Error('Unable to find account id');
        }
        return +req.params[param];
    }
}

export const useAccountService = AccountService.getInstance;