import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type Role = 'Admin' | 'User';

@Entity()
export class UsersRole {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false,
        unique: true,
        length: 255
    })
    name!: Role;
}
