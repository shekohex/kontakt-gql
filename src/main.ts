import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from '@app/app.module';
import { Env } from '@app/utils';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const appModule = app.get(ApplicationModule);
  const httpServer = app.getHttpServer();
  appModule.configureGraphQL(app, httpServer);
  await app.listen(Env<string>('APP_PORT', '3000'));
}
bootstrap();