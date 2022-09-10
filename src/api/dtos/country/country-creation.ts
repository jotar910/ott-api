import { IsInt } from 'class-validator';

export interface CountryCreationDTO {
    id: number;
}

export class CountryCreationClassDTO implements CountryCreationDTO {

    constructor(data: CountryCreationDTO) {
        Object.assign(this, data);
    }

    @IsInt()
    id!: number;
}
