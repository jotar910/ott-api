import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from '../account/model';
import { UsersRole } from '../user-role/model';

@Entity()
export class Users {

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

	@ManyToOne(() => UsersRole)
	role!: UsersRole;

	@OneToOne(() => Account)
	@JoinColumn()
	account!: Account;
}
