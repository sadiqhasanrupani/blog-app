import { UsersService } from 'src/users/providers/users.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    login(email: string, password: string): {
        message: string;
        token?: undefined;
    } | {
        message: string;
        token: string;
    };
    isAuth(): boolean;
}
