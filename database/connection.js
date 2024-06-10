const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "database/server.db",
  },
  useNullAsDefault: true,
});

module.exports = knex;
