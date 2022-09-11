import 'reflect-metadata';

import express from 'express';
import { createServer, Server as HttpServer } from 'http';

import { Env } from './config/globals';
import { logger } from './config/logger';

import { Server } from './api/server';
import { useDataSourceService } from './api/services/data-source';


// Startup
(async function main() {
    try {
        // Connect to DB.
        await useDataSourceService().connect()


        // Init express server
        logger.info('Initializing Node server...');
        const app: express.Application = new Server().app;
        const server: HttpServer = createServer(app);

        // Start express server
        server.listen(Env.all.NODE_PORT);

        server.on('listening', () => {
            logger.info(`Node server is listening on port ${Env.all.NODE_PORT} in ${Env.all.NODE_ENV} mode`);
        });

        server.on('close', () => {
            // TODO: Close db connection
            logger.info('Node server closed');
        });
    } catch (err) {
        logger.error(err);
    }
})();