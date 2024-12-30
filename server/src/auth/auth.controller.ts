import { Controller } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

/**
 * created a auth controller
 * @class
 */
@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Injecting AuthService
     * @constructor
     */
    private readonly authService: AuthService,
  ) { }
}
