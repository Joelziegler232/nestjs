import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

const PORT = 3000;
const ALLOWED_ORIGIN = 'http://localhost:5173';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.enableCors({ credentials: true, origin: ALLOWED_ORIGIN });

    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}

bootstrap();
