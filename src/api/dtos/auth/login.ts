import { IsNotEmpty, Length } from 'class-validator';

export interface LoginDTO {
    email: string;
    password: string;
}

export class LoginClassDTO implements LoginDTO {

    constructor(data: LoginDTO) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @Length(0, 255)
    email!: string;

    @IsNotEmpty()
    @Length(0, 255)
    password!: string;
}
