import { Account } from '../account/model';
import { Cast } from '../cast/model';
import { Country } from '../country/model';

export class Movie {
    id!: number;
    published!: number;
    title!: string;
    videoId!: string;
    year!: number;
    poster!: string;
    createdAt!: Date;
    updatedAt!: Date;
    directors!: Cast[];
    actors!: Cast[];
    productionCountries!: Country[];
    account!: Account;
}
