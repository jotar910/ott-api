import { hashSync } from 'bcryptjs';
import { bind } from 'decko';

import { User } from './model';
import { UserRole } from '../user-role/model';
import { IRepository, RepositoryBase } from '../helper';

export class UserDAO {
	constructor(private readonly repo: IRepository<User>) { }

	@bind
	async readById(id: number): Promise<User | null> {
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
	async readByEmail(email: string): Promise<User | null> {
		return this.repo.findOne({
			select: ['id', 'email', 'password'],
			where: {
				email,
				active: true
			}
		});
	}
}

export class UserMockRepository extends RepositoryBase<User> {
	private readonly data: User[] = [];

	async findOne({ where: { id, email } }: { where: { id: number, email: string } }): Promise<User | null> {
		return this.data.find((user) => user.id === id || user.email === email) || null;
	}

	constructor() {
		super();
		const adminRole: UserRole = {
			id: 1,
			name: 'Admin'
		};
		const userRole: UserRole = {
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
				id: 1,
				email: 'joao@mail.com',
				password: hashSync('joao', 10),
				active: true,
				role: adminRole,
				account: {
					id: 1,
					firstName: 'João',
					lastName: 'Rodrigues',
					movies: []
				}
			},
			{
				id: 1,
				email: 'tt@mail.com',
				password: hashSync('tt', 10),
				active: true,
				role: userRole,
				account: {
					id: 1,
					firstName: 'Test',
					lastName: 'Test',
					movies: []
				}
			}
		);
	}
}
