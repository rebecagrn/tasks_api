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
    const id = parseInt(request.params.id);
    const updatedFields = request.body;

    try {
      const updateResult = await getRepository(Tasks).update(id, updatedFields);

      if (updateResult.affected === 1) {
        const updatedTask = await getRepository(Tasks).findOne({
          where: { id },
        });
        return response.json(updatedTask);
      }
      return response.status(404).json({ message: "Task not found" });
    } catch (error) {
      console.error("Error updating task:", error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async finishTask(request: Request, response: Response, next: NextFunction) {
    const id: number = parseInt(request.params.id, 10);

    const finishResult = await getRepository(Tasks).update(id, {
      finished: true,
    });

    if (finishResult.affected === 1) {
      const finishedTask = await getRepository(Tasks).findOne({
        where: { id },
      });
      return response.json({ message: "Task finished!" });
    }
    return response.status(404).json({ message: "Task not found" });
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
