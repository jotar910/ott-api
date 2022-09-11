import { compare } from 'bcryptjs';
import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../config/logger';

export class UtilityService {
    private static instance: UtilityService;

    private constructor() {
        // Empty by design.
    }

    static getInstance(): UtilityService {
        if (!UtilityService.instance) {
            UtilityService.instance = new UtilityService();
        }

        return UtilityService.instance;
    }

    @bind
    handleError(err: { stack?: unknown }): void {
        logger.error(err.stack || err);
    }

    @bind
    nonNullableJSONResponse(_: Request, res: Response, next: NextFunction): Response | void {
        const json = res.json.bind(res);
        res.json = ((value: unknown) => {
            if (!value) {
                res.status(404);
                return json({ error: 'Result not found' });
            }
            return json(value);
        });
        return next();
    }

    @bind
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            compare(plainPassword, hashedPassword, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

export const useUtilityService = UtilityService.getInstance;