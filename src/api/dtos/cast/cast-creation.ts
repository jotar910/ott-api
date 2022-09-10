import { IsInt } from 'class-validator';

export interface CastCreationDTO {
    id: number;
}

export class CastCreationClassDTO implements CastCreationDTO {

    constructor(data: CastCreationDTO) {
        Object.assign(this, data);
    }

    @IsInt()
    id!: number;
}
