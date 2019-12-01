import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CompressionMiddleware } from '@nest-middlewares/compression';
import { CorsMiddleware } from '@nest-middlewares/cors';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({
      hsts: {
        // @ts-ignore
        includeSubDomains: false,
      },
    });
    CompressionMiddleware.configure({});
    // TODO: configure
    CorsMiddleware.configure({
      origin: 'localhost',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Encoding'],
    });
    consumer
      .apply(HelmetMiddleware, CompressionMiddleware, CorsMiddleware)
      .forRoutes('*');
  }
}
