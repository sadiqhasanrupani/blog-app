"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setVersion('1.0')
        .setTitle('Blogify Documentation')
        .setDescription("User the base API url on http://localhost:8080/")
        .setTermsOfService("http://localhost:8080/terms-of-service")
        .setLicense("MIT License", "https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt")
        .addServer("http://localhost:8080")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map