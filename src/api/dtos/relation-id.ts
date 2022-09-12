import { IsInt } from 'class-validator';

export interface RelationIdDTO {
    id: number;
}

export class RelationIdClassDTO implements RelationIdDTO {

    constructor(data: RelationIdDTO) {
        Object.assign(this, data);
    }

    @IsInt()
    id!: number;
}
