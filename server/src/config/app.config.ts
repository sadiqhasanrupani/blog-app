export const appConfig = () => ({
  environments: process.env.NODE_ENV || 'production',
  database: {
    databaseUrl: process.env.DATABASE_URL,
    synchronize: process.env.DATABASE_SYNC === 'true',
    autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true',
  },
});
