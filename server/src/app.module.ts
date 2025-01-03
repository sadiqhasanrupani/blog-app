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
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PostModule,
    AuthModule,
    TagsModule,
    MetaOptionsModule,
    DrizzleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
