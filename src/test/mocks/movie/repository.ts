import { DeleteResult } from 'typeorm';
import { Actor } from '../../../api/components/actor/model';
import { Country } from '../../../api/components/country/model';
import { Director } from '../../../api/components/director/model';
import { RepositoryBase } from '../../../api/components/helper';
import { Movie } from '../../../api/components/movie/model';

export class MovieMockRepository extends RepositoryBase<Movie> {
    private readonly data: Movie[] = [];

    async findAndCount(options: { skip: number; take: number; where: { account: { id: number; }; }; }): Promise<[Movie[], number]> {
        const start = options.skip;
        const end = start + options.take;
        const data = this.data.filter((movie) => movie.account.id === options.where.account.id);
        return [data.slice(start, end), data.length];
    }

    async findOne({ where: { id, account: { id: accountId } } }: { where: { id: number; account: { id: number; }; }; }): Promise<Movie | null> {
        return this.data.find((movie) => movie.id === id && movie.account.id === accountId) || null;
    }

    async findOneBy({ id, account: { id: accountId } }: { id: number; account: { id: number; }; }): Promise<Movie | null> {
        return this.data.find((movie) => movie.id === id && movie.account.id === accountId) || null;
    }

    async save(movie: Movie): Promise<Movie> {
        if (movie.id) {
            const curMovie = await this.findOne({ where: { id: movie.id, account: { id: movie.account.id } } });
            return Object.assign(curMovie || {}, movie);
        }
        movie.id = this.data[this.data.length - 1].id + 1;
        this.data.push(movie);
        return movie;
    }

    async delete({ id, account: { id: accountId } }: Movie): Promise<DeleteResult> {
        const index = this.data.findIndex((movie) => movie.id === id && movie.account.id === accountId);
        this.data.splice(index, 1);
        return { affected: 1 } as DeleteResult;
    }

    constructor() {
        super();

        const directors: Director[] = [
            {
                id: 1,
                name: 'Joana Andrade'
            },
            {
                id: 2,
                name: 'João Rodrigues'
            }
        ];

        const actors: Actor[] = [
            {
                id: 1,
                name: 'Joana Andrade'
            },
            {
                id: 2,
                name: 'João Rodrigues'
            }
        ];

        const countries: Country[] = [
            {
                id: 1,
                name: 'Portugal'
            },
            {
                id: 2,
                name: 'Switzerland'
            }
        ];

        const sample: Movie[] = [
            {
                id: 1,
                title: 'Purple Hearts',
                year: 2022,
                published: 1,
                videoId: '1680608156245230581',
                poster: 'localhost/images/1',
                createdAt: 0,
                updatedAt: 0,
                actors: actors,
                directors: directors,
                productionCountries: countries,
                account: { id: 1 }
            },
            {
                id: 2,
                title: 'Top Gun: Maverick',
                year: 2022,
                published: 0,
                videoId: '1680608156245230582',
                poster: 'localhost/images/2',
                createdAt: 0,
                updatedAt: 0,
                actors: actors,
                directors: directors,
                productionCountries: countries,
                account: { id: 2 }
            },
            {
                id: 3,
                title: 'Teen Wolf',
                year: 2011,
                published: 1,
                videoId: '1680608156245230583',
                poster: 'localhost/images/3',
                createdAt: 0,
                updatedAt: 0,
                actors: actors,
                directors: directors,
                productionCountries: countries,
                account: { id: 1 }
            },
            {
                id: 4,
                title: 'Doctor Strange in the Multiverse of Madness',
                year: 2022,
                published: 1,
                videoId: '1680608156245230584',
                poster: 'localhost/images/4',
                createdAt: 0,
                updatedAt: 0,
                actors: actors,
                directors: directors,
                productionCountries: countries,
                account: { id: 2 }
            }
        ] as Movie[];

        for (let i = 0; i < 200; ++i) {
            for (const v of sample) {
                this.data.push(v);
            }
        }
    }
}
