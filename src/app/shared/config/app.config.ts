import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  port: Number(process.env.PORT),
  apiPrefix: process.env.API_PREFIX,
  env: process.env.NODE_ENV,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
  version: process.env.APP_VERSION,
}))
