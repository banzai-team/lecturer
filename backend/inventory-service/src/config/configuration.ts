const bullMqConfig = () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379, 
})

export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    bullMq: bullMqConfig()
})

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
