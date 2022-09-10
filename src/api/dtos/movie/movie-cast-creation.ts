import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, ValidateNested } from 'class-validator';
import { CastCreationClassDTO, CastCreationDTO } from '../cast/cast-creation';

export interface MovieCastCreationDTO {
    actors: CastCreationDTO[];
    directors: CastCreationDTO[];
}

export class MovieCastCreationClassDTO implements MovieCastCreationDTO {

    constructor(data: MovieCastCreationDTO) {
        this.actors = data?.actors && data.actors.map((d) => d && new CastCreationClassDTO(d));
        this.directors = data?.directors && data.directors.map((d) => d && new CastCreationClassDTO(d));
    }

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested()
    actors!: CastCreationClassDTO[];

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested()
    directors!: CastCreationClassDTO[];
}
