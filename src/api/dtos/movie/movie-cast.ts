import { CastDTO } from '../cast/cast'

export interface MovieCastDTO {
    actors: CastDTO[];
    directors: CastDTO[];
}