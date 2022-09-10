import { CountryDTO } from '../country/country';
import { MovieCastDTO } from './movie-cast';
import { MovieListItemDTO } from './movie-list';

export interface MovieDTO extends MovieListItemDTO {
    production_year: number;
    video_id: string;
    production_country: CountryDTO[];
    cast: MovieCastDTO;
}
