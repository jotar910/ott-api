import { MovieDTO } from '../../dtos/movie/movie'
import { MovieListItemDTO } from '../../dtos/movie/movie-list'
import { CastMapper } from '../cast/mapper'
import { CountryMapper } from '../country/mapper'
import { Movie } from './model'

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
}