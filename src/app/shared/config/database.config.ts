import { registerAs } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env' })

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV === 'development',
}

export default registerAs('database', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)
