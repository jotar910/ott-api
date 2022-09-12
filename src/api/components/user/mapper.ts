import { Users } from './model';
import { UserDTO } from '../../dtos/user/user';

export class UserMapper {
    static toDTO(user: Users): UserDTO {
        return {
            id: user.id,
            email: user.email
        };
    }
}