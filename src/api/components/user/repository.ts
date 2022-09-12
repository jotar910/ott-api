import { bind } from 'decko';

import { IRepository } from '../helper';
import { Users } from './model';

export class UserDAO {
	constructor(private readonly repo: IRepository<Users>) { }

	@bind
	async readById(id: number): Promise<Users | null> {
		return this.repo.findOne({
			select: ['id', 'email', 'role', 'account'],
			relations: ['role', 'account'],
			where: {
				active: true,
				id: id
			}
		});
	}

	@bind
	async readByEmail(email: string): Promise<Users | null> {
		return this.repo.findOne({
			select: ['id', 'email', 'password'],
			where: {
				email,
				active: true
			}
		});
	}
}
