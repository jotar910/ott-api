import { IRouter, Router } from "express";
import { IComponentRoutes } from "../helper";
import { MovieController } from "./controller";

export class MovieRoutes implements IComponentRoutes<MovieController> {
    readonly controller: MovieController = new MovieController();
    readonly router: IRouter = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes(): void {
        this.router.get(
			'/',
			this.controller.readMovies
		);
    }
}