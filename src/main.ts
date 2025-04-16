import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { initSecurityConfig } from './startup/security.config';
import { initSwaggerConfig } from './startup/swagger.cofig';
import { initGlobalConfig } from './startup/global.config';
import * as dotenv from 'dotenv';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

dotenv.config({ path: '.env.local' });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  app.use((req: Request, res: Response, next: NextFunction) => {
     res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; " +
      "style-src 'self' 'unsafe-inline'; " + 
      "script-src 'self'; " +
      "img-src 'self' data:;"
    );
    next();
 
  });
  initSecurityConfig(app);
  initSwaggerConfig(app);

  initGlobalConfig(app);


  await app.listen(process.env.PORT);
}
bootstrap();

