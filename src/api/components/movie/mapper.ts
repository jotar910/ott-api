import { MovieDTO } from '../../dtos/movie/movie'
import { MovieListItemDTO } from '../../dtos/movie/movie-list'
import { Movie } from './model'

export class MovieMapper {
    static toDTO(movie: Movie): MovieDTO {
        return {
            ...MovieMapper.toListItemDTO(movie),
            video_id: movie.videoId,
            production_year: movie.year,
            cast: {
                directors: movie.directors.map(({ name }) => ({ name })),
                actors: movie.actors.map(({ name }) => ({ name })),
            },
            production_country: movie.productionCountries.map(({ name }) => ({ name }))
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