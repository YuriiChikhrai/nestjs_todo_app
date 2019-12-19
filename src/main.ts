import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('TODO API')
      .setDescription('TODO API description')
      .setVersion('1.0')
      .addTag('todo')
      .build(),
  );
  SwaggerModule.setup('/', app, document);

  await app.listen(PORT);
  console.log(`App started on port ${PORT}`);
}
bootstrap();
