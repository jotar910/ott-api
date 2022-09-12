import { ActorDTO } from '../../dtos/actor/actor';
import { Actor } from './model';

export class ActorMapper {
    static toDTO(actor: Actor): ActorDTO {
        return {
            id: actor.id,
            name: actor.name
        };
    }

    static toEntity(actor: ActorDTO): Actor {
        return {
            id: actor.id,
            name: actor.name as string
        };
    }
}