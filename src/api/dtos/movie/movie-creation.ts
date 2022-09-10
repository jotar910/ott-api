import { ArrayMaxSize, ArrayMinSize, IsInt, IsNotEmpty, IsNotEmptyObject, IsOptional, Length, Max, Min, ValidateNested } from 'class-validator';
import { CountryCreationClassDTO, CountryCreationDTO } from '../country/country-creation';
import { MovieCastCreationClassDTO, MovieCastCreationDTO } from './movie-cast-creation';

export interface MovieCreationDTO {
    production_year: number;
    video_id: string;
    production_country: CountryCreationDTO[];
    cast: MovieCastCreationDTO;
    published: number;
    original_title: string;
    poster: string;
}

export class MovieCreationClassDTO implements MovieCreationDTO {

    constructor(data: MovieCreationDTO) {
        Object.assign(this, data);
        this.production_country = data?.production_country && data.production_country.map((d) => d && new CountryCreationClassDTO(d));
        this.cast = data?.cast && new MovieCastCreationClassDTO(data.cast);
    }

    @IsInt()
    @Min(0)
    production_year!: number;

    @IsNotEmpty()
    video_id!: string;

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested()
    production_country!: CountryCreationClassDTO[];

    @IsNotEmptyObject()
    @ValidateNested()
    cast!: MovieCastCreationClassDTO;

    @IsInt()
    @Min(0)
    @Max(1)
    published!: number;

    @IsNotEmpty()
    @Length(0, 255)
    original_title!: string;

    @IsNotEmpty()
    @Length(0, 2048)
    poster!: string;
}
