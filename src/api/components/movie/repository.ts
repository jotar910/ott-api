import { MovieDTO } from '../../dtos/movie/movie';
import { MovieListDTO } from '../../dtos/movie/movie-list';
import { IRepository } from '../helper';
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

