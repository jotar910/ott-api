import { MovieListDTO } from '../../dtos/movie/movie-list';
import { Cast } from '../cast/model';
import { Country } from '../country/model';
import { IRepository, RepositoryBase } from '../helper';
import { Movie } from './model';

export class MovieDAO {

    constructor(private readonly repo: IRepository<Movie>) { }

    async getList(page: number, limit: number): Promise<MovieListDTO> {
        const [movies, total] = await this.repo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'ASC'
            }
        });
        const firstPage = 1;
        const lastPage = Math.max(Math.ceil(total / limit), 1);
        return {
            current_page: page,
            per_page: limit,
            first_page: firstPage,
            last_page: lastPage,
            next_page: Math.min(page + 1, lastPage),
            prev_page: Math.max(page - 1, firstPage),
            total_items: total,
            items: movies.map((movie) => ({
                id: movie.id,
                original_title: movie.title,
                poster: movie.poster,
                published: movie.published,
                created_at: movie.createdAt.toISOString(),
                updated_at: movie.updatedAt.toISOString()
            }))
        };
    }

}

export class MovieMockRepository extends RepositoryBase<Movie> {
    private readonly data: Movie[] = [];

    constructor() {
        super();

        const cast: Cast[] = [
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
                poster: 'localhost/images/1',
                createdAt: new Date(),
                updatedAt: new Date(),
                actors: cast,
                directors: cast,
                productionCountries: countries
            },
            {
                id: 2,
                title: 'Top Gun: Maverick',
                year: 2022,
                published: 0,
                poster: 'localhost/images/2',
                createdAt: new Date(),
                updatedAt: new Date(),
                actors: cast,
                directors: cast,
                productionCountries: countries
            },
            {
                id: 3,
                title: 'Teen Wolf',
                year: 2011,
                published: 1,
                poster: 'localhost/images/3',
                createdAt: new Date(),
                updatedAt: new Date(),
                actors: cast,
                directors: cast,
                productionCountries: countries
            },
            {
                id: 4,
                title: 'Doctor Strange in the Multiverse of Madness',
                year: 2022,
                published: 1,
                poster: 'localhost/images/4',
                createdAt: new Date(),
                updatedAt: new Date(),
                actors: cast,
                directors: cast,
                productionCountries: countries
            }
        ];

        for (let i = 0; i < 200; ++i) {
            for (const v of sample) {
                this.data.push(v);
            }
        }
    }

    async findAndCount(): Promise<[Movie[], number]> {
        return [this.data, this.data.length];
    }
}