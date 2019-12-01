import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  });
  // const document = SwaggerModule.createDocument(
  //   app,
  //   new DocumentBuilder()
  //     .setTitle('Item API')
  //     .setDescription('My Item API')
  //     .build(),
  // );
  // SwaggerModule.setup('docs', app, document);
  await app.listen(PORT);
  console.log(`App started on port ${PORT}`);
}
bootstrap();
