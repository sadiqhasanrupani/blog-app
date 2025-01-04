import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// configs
import profileConfig from './config/profile.config';

// entities
import { User } from './user.entity';

// controllers
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

/**
 * created a user module
 * @class
 */
@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User]), ConfigModule.forFeature(profileConfig)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
