"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../../../src/auth/providers/auth.service");
let UsersService = class UsersService {
    constructor(authService) {
        this.authService = authService;
        this.users = [
            {
                firstName: 'Sadiqhasan',
                lastName: 'Rupani',
                email: 'sadiqhasanrupani11@gmail.com',
                password: 'Sadiq@123',
                id: 1,
            },
            {
                firstName: 'Sidika',
                lastName: 'Rupani',
                email: 'sadiqhasanrupani11@gmail.com',
                password: 'Sadiq@123',
                id: 2,
            },
        ];
    }
    findAll() {
        const isAuth = this.authService.isAuth();
        if (!isAuth) {
            return { message: 'Invalid user' };
        }
        return this.users;
    }
    findOne(id) {
        return this.users.find((user) => user.id === id);
    }
    findOneByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map