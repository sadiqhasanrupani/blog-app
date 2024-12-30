import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(params: GetUsersParamDto, limit: number, page: number): CreateUserDto | CreateUserDto[] | {
        message: string;
    };
    createUser(createUserDto: CreateUserDto): {
        message: string;
    };
    patchUser(patchUserDto: PatchUserDto): {
        message: string;
        patchUserDto: PatchUserDto;
    };
}
