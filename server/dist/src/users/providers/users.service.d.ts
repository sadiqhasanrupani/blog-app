import { AuthService } from 'src/auth/providers/auth.service';
export declare class UsersService {
    private readonly authService;
    constructor(authService: AuthService);
    private users;
    findAll(): import("../dtos/create-user.dto").CreateUserDto[] | {
        message: string;
    };
    findOne(id: number): import("../dtos/create-user.dto").CreateUserDto;
    findOneByEmail(email: string): import("../dtos/create-user.dto").CreateUserDto;
}
