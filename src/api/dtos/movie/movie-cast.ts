import { ActorDTO } from '../actor/actor';
import { DirectorDTO } from '../director/director';

export interface MovieCastDTO {
    actors: ActorDTO[];
    directors: DirectorDTO[];
}