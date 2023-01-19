import { Error } from "../classes/error.js";
import fs from "fs/promises";

export class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async listAll() {
    try {
      const data = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  async save(obj) {
    try {
      const data = await this.listAll();
      let newID;

      if (data.length === 0) {
        newID = 1;
      } else {
        newID = data[data.length - 1].id + 1;
      }

      data.push({
        id: newID,
        ...obj,
      });

      await fs.writeFile(this.ruta, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error(500, "Failed to save task", error);
    }
  }
  async delete(ident) {
    try {
      const data = await this.listAll();

      const obj = data.filter((o) => o.id !== parseInt(ident));
      await fs.writeFile(this.ruta, JSON.stringify(obj, null, 2));
    } catch (error) {
      throw new Error(500, "Failed to delete task", error);
    }
  }
}
