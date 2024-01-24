import { Router, Request, Response } from "express";
// import { UserController } from "./controller/UserController";
import { TaskController } from "./controller/TasksController";

const routes = Router();
const taskController = new TaskController();
// const userController = new UserController();

routes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "hello" });
});

routes.get("/tasks", taskController.listAll.bind(taskController));
routes.post("/tasks", taskController.save.bind(taskController));
routes.get("/tasks/:id", taskController.one.bind(taskController));
routes.put("/tasks/:id", taskController.updateTask.bind(taskController));
routes.delete("/tasks/:id", taskController.remove.bind(taskController));

// user
// routes.get("/users", userController.all.bind(userController));

export default routes;
