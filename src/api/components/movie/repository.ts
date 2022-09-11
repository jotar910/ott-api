import { MovieDTO } from '../../dtos/movie/movie';
import { MovieListDTO } from '../../dtos/movie/movie-list';
import { Cast } from '../cast/model';
import { Country } from '../country/model';
import { IRepository, RepositoryBase } from '../helper';
import { MovieMapper } from './mapper';
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
            items: movies.map(MovieMapper.toListItemDTO)
        };
    }

    async get(id: number): Promise<MovieDTO | null> {
        const movie = await this.repo.findOne({
            where: { id },
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

    async create(newMovie: MovieDTO): Promise<MovieDTO> {
        return MovieMapper.toDTO(await this.repo.save(MovieMapper.toEntity(newMovie)));
    }

    async update(movieId: number, editMovie: Partial<MovieDTO>): Promise<MovieDTO | null> {
        const curMovie = await this.repo.findOneBy({ id: movieId });
        if (!curMovie) {
            return null;
        }
        const newMovie: Movie = Object.assign({}, curMovie, MovieMapper.toPartialEntity(editMovie));
        return MovieMapper.toDTO(await this.repo.save(newMovie));
    }

    async delete(movieId: number): Promise<MovieDTO | null> {
        const curMovie = await this.repo.findOneBy({ id: movieId });
        if (!curMovie) {
            return null;
        }
        return MovieMapper.toDTO(await this.repo.delete(curMovie));
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
                videoId: '1680608156245230581',
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
                videoId: '1680608156245230582',
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
                videoId: '1680608156245230583',
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
                videoId: '1680608156245230584',
                poster: 'localhost/images/4',
                createdAt: new Date(),
                updatedAt: new Date(),
                actors: cast,
                directors: cast,
                productionCountries: countries
            }
        ] as Movie[];

        for (let i = 0; i < 200; ++i) {
            for (const v of sample) {
                this.data.push(v);
            }
        }
    }

    async findAndCount(options?: { skip: number; take: number }): Promise<[Movie[], number]> {
        const start = options?.skip || 0;
        const end = start + (options?.take || 0);
        return [this.data.slice(start, end), this.data.length];
    }

    async findOne({ where: { id } }: { where: { id: number } }): Promise<Movie | null> {
        return this.data.find((movie) => movie.id === id) || null;
    }

    async findOneBy({ id }: { id: number }): Promise<Movie | null> {
        return this.data.find((movie) => movie.id === id) || null;
    }

    async save(movie: Movie): Promise<Movie> {
        if (movie.id) {
            const curMovie = await this.findOne({ where: { id: movie.id } });
            return Object.assign(curMovie || {}, movie);
        }
        movie.id = this.data[this.data.length - 1].id + 1;
        this.data.push(movie);
        return movie;
    }

    async delete({ id }: Movie): Promise<Movie> {
        const index = this.data.findIndex((movie) => movie.id === id);
        const movie = this.data[index];
        this.data.splice(index, 1);
        return movie;
    }
}