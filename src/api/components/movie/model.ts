import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/model';
import { Actor } from '../actor/model';
import { Country } from '../country/model';
import { Director } from '../director/model';

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

	@Column('timestamp with time zone', {
		nullable: false
    })
    createdAt!: number;

	@Column('timestamp with time zone', {
		nullable: false
    })
    updatedAt!: number;

	@ManyToMany(() => Director)
    @JoinTable()
    directors!: Director[];

	@ManyToMany(() => Actor)
    @JoinTable()
    actors!: Actor[];

	@ManyToMany(() => Country)
    @JoinTable()
    productionCountries!: Country[];

    @ManyToOne(() => Account, (account) => account.movies)
    account!: Account;
}
