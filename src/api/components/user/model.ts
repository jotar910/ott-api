import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from '../account/model';
import { UserRole } from '../user-role/model';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
	id!: number;

	@Column({
		nullable: false,
        length: 255
    })
	email!: string;

	@Column({
		nullable: false,
        length: 500
    })
	password!: string;

	@Column({
		nullable: false
    })
	active!: boolean;

	@ManyToOne(() => UserRole)
	role!: UserRole;

	@OneToOne(() => Account)
	@JoinColumn()
	account!: Account;
}
