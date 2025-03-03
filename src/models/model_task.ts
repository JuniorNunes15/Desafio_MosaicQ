import { Model } from "objection";
import db from "../database/knex";

Model.knex(db);

class Task extends Model {
  static get tableName() {
    return "tasks";
  }
}

export default Task;