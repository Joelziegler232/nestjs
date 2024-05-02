import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PokemonModule } from './pokemon.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from '../pages/api/poke/auth.middleware';

@Module({
  imports: [PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/pokemon');
  }
}
