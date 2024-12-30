import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// app module classes
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { UsersModule } from './users/users.module';
import { PostModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

// entities
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
  imports: [
    UsersModule,
    PostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        url: 'postgres://postgres:newpassword@localhost:5432/blogify?sslmode=disable',
        autoLoadEntities: true,
        /**
         * ONLY FOR DEVELOPMENT
         * */
        synchronize: true,

        // entities: [User],
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
