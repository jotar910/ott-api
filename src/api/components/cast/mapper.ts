import { CastDTO } from '../../dtos/cast/cast';
import { Cast } from './model';

export class CastMapper {
    static toDTO(cast: Cast): CastDTO {
        return {
            id: cast.id,
            name: cast.name
        };
    }

    static toEntity(country: CastDTO): Cast {
        return {
            id: country.id,
            name: country.name as string
        };
    }
}