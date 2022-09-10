import express from 'express';
import { config } from 'dotenv';
import { createServer, Server as HttpServer } from 'http';

import { env } from './config/globals';
import { logger } from './config/logger';

import { Server } from './api/server';


// Startup
(async function main() {
    try {
        // Set env variables from .env file
        config();

        // TODO: Connect db

        // Init express server
		logger.info('Initializing Node server...');
        const app: express.Application = new Server().app;
        const server: HttpServer = createServer(app);

        // Start express server
        server.listen(env.NODE_PORT);

        server.on('listening', () => {
            logger.info(`Node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
        });

        server.on('close', () => {
            // TODO: Close db connection
            logger.info('Node server closed');
        });
    } catch (err) {
        logger.error(err);
    }
})();