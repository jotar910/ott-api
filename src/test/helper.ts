import { Handler, IRouter, NextFunction, Request, Response } from 'express';

export function middlewareMockNext(req: Request, res: Response, next: NextFunction) {
    next();
}

export function middlewareMock(cb: Handler = middlewareMockNext) {
    return (req: Request, res: Response, next: NextFunction) => {
        cb(req, res, next);
    };
}

export const mockRouter = () => ({
    param: jest.fn(),
    all: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    options: jest.fn(),
    head: jest.fn(),
    checkout: jest.fn(),
    connect: jest.fn(),
    copy: jest.fn(),
    lock: jest.fn(),
    merge: jest.fn(),
    mkactivity: jest.fn(),
    mkcol: jest.fn(),
    move: jest.fn(),
    notify: jest.fn(),
    propfind: jest.fn(),
    proppatch: jest.fn(),
    purge: jest.fn(),
    report: jest.fn(),
    search: jest.fn(),
    subscribe: jest.fn(),
    trace: jest.fn(),
    unlock: jest.fn(),
    unsubscribe: jest.fn(),
    use: jest.fn(),
    route: jest.fn(),
    stack: [],
} as unknown as IRouter);