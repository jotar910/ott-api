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
    @IsOptional({ groups: ['movie/optional']})
    production_year!: number;

    @IsNotEmpty()
    @IsOptional({ groups: ['movie/optional']})
    video_id!: string;

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested()
    @IsOptional({ groups: ['movie/optional']})
    production_country!: CountryCreationClassDTO[];

    @IsNotEmptyObject()
    @ValidateNested()
    @IsOptional({ groups: ['movie/optional']})
    cast!: MovieCastCreationClassDTO;

    @IsInt()
    @Min(0)
    @Max(1)
    @IsOptional({ groups: ['movie/optional']})
    published!: number;

    @IsNotEmpty()
    @Length(0, 255)
    @IsOptional({ groups: ['movie/optional']})
    original_title!: string;

    @IsNotEmpty()
    @Length(0, 2048)
    @IsOptional({ groups: ['movie/optional']})
    poster!: string;
}
