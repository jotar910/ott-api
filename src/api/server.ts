import express from 'express';

import { initRestRoutes } from './routes';

export class Server {
	private readonly _app: express.Application = express();

	constructor() {
		initRestRoutes(this._app);
	}

	get app(): express.Application {
		return this._app;
	}
}
