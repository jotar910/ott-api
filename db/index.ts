import { hashSync } from 'bcryptjs';
import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { Client } from 'pg';

// Config .env variables.
config();

// Read movies CSV file
const seedQuery = readFileSync('db/seed.sql', {
	encoding: 'utf-8'
});

// Connect to database
const configs = {
	host: process.env.TYPEORM_HOST,
	port: +process.env.TYPEORM_PORT!,
	user: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE
};
const client = new Client(configs);

client.connect();

// Generate random password for initial admin user
const pswAdmin = Math.random().toString(36).substring(2);
const adminHash = hashSync(pswAdmin, 10);
const pswUser1 = Math.random().toString(36).substring(2);
const user1Hash = hashSync(pswUser1, 10);
const pswUser2 = Math.random().toString(36).substring(2);
const user2Hash = hashSync(pswUser2, 10);


(async function run() {
	try {
		console.log('Running SQL seed...');
		await client.query('BEGIN');

		/* Insert user roles */
		await client.query(`
				INSERT INTO users_role (id, name)
				VALUES (1, 'Admin'), (2, 'User');
					`);

		/* Insert admin account */
		await client.query(`
				INSERT INTO account ("id", "firstName", "lastName")
				VALUES (1, 'Admin', 'Admin');
					`);
		await client.query(`
				INSERT INTO users ("email", "password", "active", "roleId", "accountId")
				VALUES ('admin@email.com', $1, TRUE, 1, 1);
					`, [adminHash]);
		console.log(`Password for initial admin account: "${pswAdmin}"`);

		/* Insert user account 1 */
		await client.query(`
				INSERT INTO account ("id", "firstName", "lastName")
				VALUES (2, 'User', '1');
					`);
		await client.query(`
				INSERT INTO users ("email", "password", "active", "roleId", "accountId")
				VALUES ('user1@email.com', $1, TRUE, 2, 2);
					`, [user1Hash]);
		console.log(`Password for initial user 1 account: "${pswUser1}"`);

		/* Insert user account 2 */
		await client.query(`
				INSERT INTO account ("id", "firstName", "lastName")
				VALUES (3, 'User', '2');
					`);
		await client.query(`
				INSERT INTO users ("email", "password", "active", "roleId", "accountId")
				VALUES ('user2@email.com', $1, TRUE, 2, 3);
					`, [user2Hash]);
		console.log(`Password for initial user 2 account: "${pswUser2}"`);
		
		await client.query(seedQuery);

		await client.query('COMMIT');
		console.log('SQL seed completed!');
	} catch (e) {
		await client.query('ROLLBACK');
		throw e;
	} finally {
		client.end();
	}
})()
