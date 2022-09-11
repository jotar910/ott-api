import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type Role = 'Admin' | 'User';

@Entity()
export class UserRole {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false,
        unique: true,
        length: 255
    })
    name!: Role;
}
