import { MovieDTO } from '../../dtos/movie/movie'
import { MovieCreationDTO } from '../../dtos/movie/movie-creation'
import { MovieListItemDTO } from '../../dtos/movie/movie-list'
import { CastMapper } from '../cast/mapper'
import { CountryMapper } from '../country/mapper'
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
                directors: movie.directors.map(CastMapper.toDTO),
                actors: movie.actors.map(CastMapper.toDTO)
            },
            production_country: movie.productionCountries.map(CountryMapper.toDTO)
        }
    }

    static toListItemDTO(movie: Movie): MovieListItemDTO {
        return {
            id: movie.id,
            original_title: movie.title,
            poster: movie.poster,
            published: movie.published,
            created_at: movie.createdAt.toISOString(),
            updated_at: movie.updatedAt.toISOString()
        }
    }

    static toEntity(movie: MovieDTO): Movie {
        return {
            id: movie.id,
            title: movie.original_title,
            poster: movie.poster,
            published: movie.published,
            videoId: movie.video_id,
            year: movie.production_year,
            directors: movie.cast.directors.map(CastMapper.toEntity),
            actors: movie.cast.actors.map(CastMapper.toEntity),
            productionCountries: movie.production_country.map(CountryMapper.toEntity),
            createdAt: new Date(movie.created_at),
            updatedAt: new Date(movie.updated_at)
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
        ifDefinedRun(movie.cast, (value) => res.directors = value.directors.map(CastMapper.toEntity));
        ifDefinedRun(movie.cast, (value) => res.actors = value.actors.map(CastMapper.toEntity));
        ifDefinedRun(movie.production_country, (value) => res.productionCountries = value.map(CountryMapper.toEntity));
        ifDefinedRun(movie.created_at, (value) => res.createdAt = new Date(value));
        ifDefinedRun(movie.updated_at, (value) => res.updatedAt = new Date(value));
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
}