import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

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
}

export const useValidatorService = ValidatorService.getInstance;