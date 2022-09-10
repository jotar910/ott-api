import { Router } from "express";
import { MovieRoutes } from "./movie/routes";

export function registerApiRoutes(router: Router, prefix: string = ''): void {
	router.use(`${prefix}/movies`, new MovieRoutes().router);
}