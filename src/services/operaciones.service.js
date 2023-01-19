import { Contenedor } from "../container/main.js";

export class ContenedorService {
  constructor() {
    this.container = new Contenedor("./json/task.json");
  }

  async listTask() {
    return await this.container.listAll();
  }
  async addTask(req) {
    const task = {
      title: req.body.title,
      description: req.body.description,
    };

    return await this.container.save(task);
  }
  async deleteTask(req) {
    return await this.container.delete(req.params.id);
  }
}
