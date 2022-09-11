import { UserRole } from '../user-role/model';

export class User {
	id!: number;
	email!: string;
	password!: string;
	active!: boolean;
	role!: UserRole;
}
