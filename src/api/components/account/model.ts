import { Movie } from '../movie/model';

export class Account {
    id!: number;
    firstName!: string;
    lastName!: string;
    movies!: Movie[];
}