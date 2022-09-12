import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, ValidateNested } from 'class-validator';
import { RelationIdClassDTO, RelationIdDTO } from '../relation-id';

export interface MovieCastCreationDTO {
    actors: RelationIdDTO[];
    directors: RelationIdDTO[];
}

export class MovieCastCreationClassDTO implements MovieCastCreationDTO {

    constructor(data: MovieCastCreationDTO) {
        this.actors = data?.actors && data.actors.map((d) => d && new RelationIdClassDTO(d));
        this.directors = data?.directors && data.directors.map((d) => d && new RelationIdClassDTO(d));
    }

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested()
    actors!: RelationIdClassDTO[];

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested()
    directors!: RelationIdClassDTO[];
}
