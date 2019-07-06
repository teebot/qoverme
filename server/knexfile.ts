module.exports = {
  development: {
    client: "pg",
    connection: "postgres://qover:qover@localhost:5432/qover-local",
    migrations: {
      tableName: "knex_migrations"
    },
    useNullAsDefault: true
  }
};
