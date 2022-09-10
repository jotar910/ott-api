import { MovieDTO } from '../../dtos/movie/movie'
import { MovieCreationDTO } from '../../dtos/movie/movie-creation'
import { MovieListItemDTO } from '../../dtos/movie/movie-list'
import { CastMapper } from '../cast/mapper'
import { CountryMapper } from '../country/mapper'
import { Movie } from './model'

const UNDEFINED = <T>() => undefined as T;

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