import knex from "knex";
import { Model } from "objection";
import dotenv from "dotenv";
dotenv.config();

const db = knex({
  client: "sqlite3",
  connection: {
    filename: process.env.DB_FILE || "./tasks.db",
  },
  useNullAsDefault: true,
});

export function setupDatabase() {
  Model.knex(db);
}

export default db;