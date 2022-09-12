import { DeleteResult } from 'typeorm';
import { MovieDTO } from '../../dtos/movie/movie';
import { MovieListDTO } from '../../dtos/movie/movie-list';
import { Actor } from '../actor/model';
import { Country } from '../country/model';
import { Director } from '../director/model';
import { IRepository, RepositoryBase } from '../helper';
import { MovieMapper } from './mapper';
import { Movie } from './model';

export class MovieDAO {

    constructor(private readonly repo: IRepository<Movie>) { }

    async getList(accountId: number, page: number, limit: number): Promise<MovieListDTO> {
        const [movies, total] = await this.repo.findAndCount({
            where: { account: { id: accountId } },
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
            items: movies.map(MovieMapper.toListItemDTO)
        };
    }

    async get(accountId: number, id: number): Promise<MovieDTO | null> {
        const movie = await this.repo.findOne({
            where: { id, account: { id: accountId } },
            relations: {
                directors: true,
                actors: true,
                productionCountries: true
            }
        });
        if (!movie) {
            return null;
        }
        return MovieMapper.toDTO(movie);
    }

    async create(accountId: number, newMovie: MovieDTO): Promise<MovieDTO> {
        return MovieMapper.toDTO(await this.repo.save(MovieMapper.toEntity(accountId, newMovie)));
    }

    async update(accountId: number, movieId: number, editMovie: Partial<MovieDTO>): Promise<MovieDTO | null> {
        const curMovie = await this.repo.findOne({
            where: {
                id: movieId,
                account: { id: accountId }
            },
            relations: ['directors', 'actors', 'productionCountries']
        });
        if (!curMovie) {
            return null;
        }
        const newMovie: Movie = Object.assign({}, curMovie, MovieMapper.toPartialEntity(editMovie));
        return MovieMapper.toDTO(await this.repo.save(newMovie));
    }

    async delete(accountId: number, movieId: number): Promise<{ message: string } | null> {
        const curMovie = await this.repo.findOneBy({ id: movieId, account: { id: accountId } });
        if (!curMovie) {
            return null;
        }
        const result = await this.repo.delete(curMovie);
        if (result.affected === 0) {
            return null;
        }
        return { message: 'Movie deleted' };
    }

}

export class MovieMockRepository extends RepositoryBase<Movie> {
    private readonly data: Movie[] = [];

    async findAndCount(options: { skip: number; take: number, where: { account: { id: number } } }): Promise<[Movie[], number]> {
        const start = options.skip;
        const end = start + options.take;
        const data = this.data.filter((movie) => movie.account.id === options.where.account.id);
        return [data.slice(start, end), data.length];
    }

    async findOne({ where: { id, account: { id: accountId } } }: { where: { id: number, account: { id: number } } }): Promise<Movie | null> {
        return this.data.find((movie) => movie.id === id && movie.account.id === accountId) || null;
    }

    async findOneBy({ id, account: { id: accountId } }: { id: number, account: { id: number } }): Promise<Movie | null> {
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