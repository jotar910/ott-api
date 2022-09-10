import { IRouter } from "express";

export interface IComponentRoutes<T> {
    readonly controller: T;
	readonly router: IRouter;

	initRoutes(): void;
}