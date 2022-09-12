import { MovieDTO } from '../../dtos/movie/movie'
import { MovieCreationDTO } from '../../dtos/movie/movie-creation'
import { MovieListItemDTO } from '../../dtos/movie/movie-list'
import { Account } from '../account/model'
import { ActorMapper } from '../actor/mapper'
import { CountryMapper } from '../country/mapper'
import { DirectorMapper } from '../director/mapper'
import { Movie } from './model'

const UNDEFINED = <T>() => undefined as T;

function ifDefinedRun<T, V>(value: T | undefined, cb: (_: T) => V): V | undefined {
    return value && cb(value);
}

export class MovieMapper {
    static toDTO(movie: Movie): MovieDTO {
        return {
            ...MovieMapper.toListItemDTO(movie),
            video_id: movie.videoId,
            production_year: movie.year,
            cast: {
                directors: movie.directors && movie.directors.map(DirectorMapper.toDTO),
                actors: movie.actors && movie.actors.map(ActorMapper.toDTO)
            },
            production_country: movie.productionCountries && movie.productionCountries.map(CountryMapper.toDTO)
        }
    }

    static toListItemDTO(movie: Movie): MovieListItemDTO {
        return {
            id: movie.id,
            original_title: movie.title,
            poster: movie.poster,
            published: movie.published,
            created_at: MovieMapper.toISOString(movie.createdAt),
            updated_at: MovieMapper.toISOString(movie.updatedAt)
        }
    }

    static toEntity(accountId: number, movie: MovieDTO): Movie {
        return {
            id: movie.id,
            title: movie.original_title,
            poster: movie.poster,
            published: movie.published,
            videoId: movie.video_id,
            year: movie.production_year,
            directors: movie.cast.directors.map(DirectorMapper.toEntity),
            actors: movie.cast.actors.map(ActorMapper.toEntity),
            productionCountries: movie.production_country.map(CountryMapper.toEntity),
            createdAt: MovieMapper.toTimestamp(movie.created_at),
            updatedAt: MovieMapper.toTimestamp(movie.updated_at),
            account: { id: accountId } as Account
        };
    }

    static toPartialEntity(movie: Partial<MovieDTO>): Partial<Movie> {
        const res: Partial<Movie> = {};
        ifDefinedRun(movie.id, (value) => res.id = value);
        ifDefinedRun(movie.original_title, (value) => res.title = value);
        ifDefinedRun(movie.poster, (value) => res.poster = value);
        ifDefinedRun(movie.published, (value) => res.published = value);
        ifDefinedRun(movie.video_id, (value) => res.videoId = value);
        ifDefinedRun(movie.production_year, (value) => res.year = value);
        ifDefinedRun(movie.cast, (value) => res.directors = value.directors.map(DirectorMapper.toEntity));
        ifDefinedRun(movie.cast, (value) => res.actors = value.actors.map(ActorMapper.toEntity));
        ifDefinedRun(movie.production_country, (value) => res.productionCountries = value.map(CountryMapper.toEntity));
        ifDefinedRun(movie.created_at, (value) => res.createdAt = MovieMapper.toTimestamp(value));
        ifDefinedRun(movie.updated_at, (value) => res.updatedAt = MovieMapper.toTimestamp(value));
        return res;
    }

    static fromCreationToDTO(creation: MovieCreationDTO): MovieDTO {
        const today = new Date().toISOString();
        return {
            ...creation,
            id: UNDEFINED(),
            created_at: today,
            updated_at: today
        };
    }

    private static toISOString(timestamp: number) {
        return new Date(+timestamp).toISOString();
    }

    private static toTimestamp(date: string) {
        return new Date(date).getTime();
    }
}