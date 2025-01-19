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
import { PaginationModule } from './common/pagination/pagination.module';

// configs
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';

/** 
 * ENV which stores the current environment
 * */
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('database.databaseUrl');
        const synchronize = configService.get<boolean>('database.synchronize');
        const autoLoadEntities = configService.get<boolean>('database.autoLoadEntities');

        return {
          type: 'postgres',
          url: databaseUrl,
          autoLoadEntities,
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
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
