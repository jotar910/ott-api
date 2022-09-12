import { hashSync } from 'bcryptjs';
import { bind } from 'decko';

import { Users } from './model';
import { UsersRole } from '../user-role/model';
import { IRepository, RepositoryBase } from '../helper';

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

export class UserMockRepository extends RepositoryBase<Users> {
	private readonly data: Users[] = [];

	async findOne({ where: { id, email } }: { where: { id: number, email: string } }): Promise<Users | null> {
		return this.data.find((user) => user.id === id || user.email === email) || null;
	}

	constructor() {
		super();
		const adminRole: UsersRole = {
			id: 1,
			name: 'Admin'
		};
		const userRole: UsersRole = {
			id: 2,
			name: 'User'
		};
		this.data.push(
			{
				id: 1,
				email: 'joana@mail.com',
				password: hashSync('joana', 10),
				active: true,
				role: adminRole,
				account: {
					id: 1,
					firstName: 'Joana',
					lastName: 'Andrade',
					movies: []
				}
			},
			{
				id: 2,
				email: 'joao@mail.com',
				password: hashSync('joao', 10),
				active: true,
				role: adminRole,
				account: {
					id: 2,
					firstName: 'João',
					lastName: 'Rodrigues',
					movies: []
				}
			},
			{
				id: 3,
				email: 'tt@mail.com',
				password: hashSync('tt', 10),
				active: true,
				role: userRole,
				account: {
					id: 3,
					firstName: 'Test',
					lastName: 'Test',
					movies: []
				}
			}
		);
	}
}
