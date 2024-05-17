import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpSuccessInterceptor } from './http-success/http-success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpSuccessInterceptor());
  await app.listen(3000);
}
bootstrap();
