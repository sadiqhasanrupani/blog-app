import { UsersService } from 'src/users/providers/users.service';
export declare class PostsService {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(userId: number): {
        message: string;
    };
}
