import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JtwAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const config = new DocumentBuilder()
    .setTitle('Brassinne Joaquin API')
    .setDescription('API documentation for Brassinne Joaquin about user, organization, and login management')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
        description: 'Enter JWT token',
      })
    .build();



  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);


  const jwtAuthGuard = app.get(JtwAuthGuard);
  app.useGlobalGuards(jwtAuthGuard);

  await app.listen(process.env.PORT ?? 3000);
  
}

bootstrap();
