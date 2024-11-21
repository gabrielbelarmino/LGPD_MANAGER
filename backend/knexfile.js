const defaultConfig = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  migrations: {
    directory: __dirname + "/knexDB/migrations"
  },
  seeds: {
    directory: __dirname + "/knexDB/seeds"
  }
};

module.exports =  defaultConfig;