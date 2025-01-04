import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

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

import { appConfig } from './config/app.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const synchronize = configService.get<boolean>('SYNCHRONIZE');

        return {
          type: 'postgres',
          url: databaseUrl,
          autoLoadEntities: true,
          synchronize,
        };
      },
    }),
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
