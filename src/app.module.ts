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
import { TypeOrmModule } from '@nestjs/typeorm';
import { path } from 'app-root-path';
import { join } from 'path';
import { Connection } from 'typeorm';
import { TODO } from './todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(path, 'data', 'db.sqlite'),
      entities: [TODO],
      synchronize: true,
      logging: 'all',
    }),
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
  constructor(private readonly connection: Connection) {}
}
