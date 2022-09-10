import { CastDTO } from '../../dtos/cast/cast';
import { Cast } from './model';

export class CastMapper {
    static toDTO(cast: Cast): CastDTO {
        return {
            id: cast.id,
            name: cast.name
        };
    }
}