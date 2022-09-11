import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../movie/model';

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id!: number;

	@Column({
		nullable: false,
        length: 125
	})
    firstName!: string;

	@Column({
		nullable: false,
        length: 125
	})
    lastName!: string;

    @OneToMany(() => Movie, (movie) => movie.account)
    movies!: Movie[];
}