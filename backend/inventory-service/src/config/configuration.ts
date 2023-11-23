import { DataSourceOptions } from "typeorm";
import dbConfig from "./db.config";

const bullMqConfig = () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379, 
})

export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    bullMq: bullMqConfig(),
    db: dbConfig()
})

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
