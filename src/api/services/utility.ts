import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

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
    nonNullableJSONResponse(_: Request, res: Response, next: NextFunction): Response | void {
        const json = res.json.bind(res);
        res.json = ((value: unknown) => {
            if (!value) {
                res.status(404);
                return json({ cause: 'Result is empty' });
            }
            return json(value);
        });
        return next();
    }
}

export const useUtilityService = UtilityService.getInstance;