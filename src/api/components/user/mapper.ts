import { User } from './model';
import { UserDTO } from '../../dtos/user/user';

export class UserMapper {
    static toDTO(user: User): UserDTO {
        return {
            id: user.id,
            email: user.email
        };
    }
}