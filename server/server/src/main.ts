import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Blogify Documentation')
    .setDescription("User the base API url on http://localhost:8080/")
    .setTermsOfService("http://localhost:8080/terms-of-service")
    .setLicense("MIT License", "https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt")
    .addServer("http://localhost:8080")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
