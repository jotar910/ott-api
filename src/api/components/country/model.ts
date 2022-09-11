import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
	
    @PrimaryGeneratedColumn()
    id!: number;


	@Column({
		nullable: false,
		unique: true,
        length: 255
	})
    name!: string;
}