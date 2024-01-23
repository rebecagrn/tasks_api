import * as express from "express";
import * as bodyParser from "body-parser";
import { createConnection, ConnectionOptions } from "typeorm";
import routes from "./routes";

const app = express();

async function start() {
  try {
    const connectionOptions: ConnectionOptions = {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "db_tasks",
      synchronize: true,
      logging: false,
      entities: ["src/entity/*.ts"],
    };

    await createConnection(connectionOptions);

    app.use(bodyParser.json());
    app.use(routes);

    // Start the Express app
    const port = 3333;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

start();
