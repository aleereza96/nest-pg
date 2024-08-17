import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.setGlobalPrefix(configService.get('app.apiPrefix'))

  const allowedOrigins =
    configService.get('app.allowedOrigins').split(',') || []
  app.enableCors({ origin: allowedOrigins })

  const options = new DocumentBuilder()
    .setTitle('api docs')
    .setVersion(configService.get('app.version'))
    .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('docs', app, document)

  const port = configService.get('app.port')
  await app.listen(port)
}
bootstrap()
