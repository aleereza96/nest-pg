import { registerAs } from '@nestjs/config'

export default registerAs('auth', () => ({
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  tokenSecret: process.env.TOKEN_SECRET,
}))
