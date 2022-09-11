import { config } from 'dotenv';

export class Env {

	static {
		// Set env variables from .env file
		config();
	}

	static get all() {
		return {
			NODE_ENV: process.env.NODE_ENV || 'development',
			NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3000,
			DOMAIN: process.env.DOMAIN,

			TYPEORM_HOST: process.env.TYPEORM_HOST || 'localhost',
			TYPEORM_PORT: +(process.env.TYPEORM_PORT || 5432),
			TYPEORM_USERNAME: process.env.TYPEORM_USERNAME || 'root',
			TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD || 'password',
			TYPEORM_DATABASE: process.env.TYPEORM_DATABASE || 'ott_movies',
			TYPEORM_ENTITIES: [process.env.TYPEORM_ENTITIES || 'src/api/components/**/model.ts'],
			TYPEORM_SYNCHRONIZE: (process.env.TYPEORM_SYNCHRONIZE || 'true') === 'true',
			TYPEORM_LOGGING: (process.env.TYPEORM_LOGGING || 'false') === 'true'
		};
	}
}