module.exports = {
  development: {
    client: "pg",
    connection: "postgres://qover:qover@localhost:5432/qover-local",
    migrations: {
      tableName: "knex_migrations"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations"
    },
    useNullAsDefault: true
  }
};
