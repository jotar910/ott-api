import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/model';
import { Cast } from '../cast/model';
import { Country } from '../country/model';

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id!: number;

	@Column('smallint', {
		nullable: false
    })
    published!: number;

	@Column({
		nullable: false,
        length: 500
    })
    title!: string;

	@Column({
		nullable: false,
        length: 20
    })
    videoId!: string;

	@Column('smallint', {
		nullable: false
    })
    year!: number;

	@Column({
		nullable: false,
        length: 500
    })
    poster!: string;

	@Column('date', {
		nullable: false
    })
    createdAt!: Date;

	@Column('date', {
		nullable: false
    })
    updatedAt!: Date;

	@ManyToMany(() => Cast)
    @JoinTable()
    directors!: Cast[];

	@ManyToMany(() => Cast)
    @JoinTable()
    actors!: Cast[];

	@ManyToMany(() => Country)
    @JoinTable()
    productionCountries!: Country[];

    @ManyToOne(() => Account, (account) => account.movies)
    account!: Account;
}
