import { DirectorDTO } from '../../dtos/director/director';
import { Director } from './model';

export class DirectorMapper {
    static toDTO(director: Director): DirectorDTO {
        return {
            id: director.id,
            name: director.name
        };
    }

    static toEntity(director: DirectorDTO): Director {
        return {
            id: director.id,
            name: director.name as string
        };
    }
}