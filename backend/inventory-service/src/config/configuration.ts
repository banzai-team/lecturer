export default () => ({
    port: parseInt(process.env.PORT) || 3000,
});

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
