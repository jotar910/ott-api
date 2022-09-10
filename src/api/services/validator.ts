import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { validate } from 'class-validator';

export class ValidatorService {
    private static instance: ValidatorService;

    private constructor() {
        // Empty by design.
    }

    static getInstance(): ValidatorService {
        if (!ValidatorService.instance) {
            ValidatorService.instance = new ValidatorService();
        }

        return ValidatorService.instance;
    }

    @bind
    validateRequest(req: Request, res: Response, next: NextFunction): Response | void {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        return next();
    }

    @bind
    validateRequestBody<TInterface, TClass extends TInterface & object>(bodyClass: new (data: TInterface) => TClass, groups: string[] = ['required']) {
        return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
            const bodyObj: TClass = new bodyClass(req.body);

            const errors = await validate(bodyObj, { always: true, groups });

            if (errors.length > 0) {
                return res.status(400).json({ error: errors });
            }

            return next();
        };
    }
}

export const useValidatorService = ValidatorService.getInstance;