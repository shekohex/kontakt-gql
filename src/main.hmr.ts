import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from '@app/app.module';
import { Env } from '@app/utils';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const appModule = app.get(ApplicationModule);
  const httpServer = app.getHttpServer();
  appModule.configureGraphQL(app, httpServer);
  await app
    .disable('etag')
    .disable('x-powered-by')
    .listen(Env<string>('PORT', '3000'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
