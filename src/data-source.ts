import "reflect-metadata";
import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "db_tasks",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
});
