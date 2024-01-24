import { getRepository } from "typeorm";
import { Tasks } from "../entity/Tasks";
import { NextFunction, Request, Response } from "express";

export class TaskController {
  async listAll(request: Request, response: Response, next: NextFunction) {
    try {
      const tasks = await getRepository(Tasks).find();
      response.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const task = getRepository(Tasks).save(request.body);

      if (!task) {
        response.status(404).json({ message: "Task not found" });
        return;
      }

      response.json(task);
    } catch (error) {
      next(error);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id: number = parseInt(request.params.id, 10);

      const task = await getRepository(Tasks).findOne({ where: { id } });

      response.json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const updatedFields = request.body;

    try {
      // Update the task
      const updateResult = await getRepository(Tasks).update(id, updatedFields);

      if (updateResult.affected === 1) {
        const updatedTask = await getRepository(Tasks).findOne(id);

        if (updatedTask) {
          return response.status(200).json(updatedTask);
        } else {
          return response.status(404).json({ message: "Task not found" });
        }
      }
      return response.status(404).json({ message: "Task not found" });
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const taskToRemove = await getRepository(Tasks).delete(id);

      if (taskToRemove.affected === 1) {
        return response.json({ message: "Task has been removed" });
      }
      response.status(404).json({ message: "Task not found" });
    } catch (error) {
      next(error);
    }
  }
}
