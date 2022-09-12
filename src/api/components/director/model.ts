import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Director {

    @PrimaryGeneratedColumn()
    id!: number;


	@Column({
		nullable: false,
        length: 255
	})
    name!: string;
}