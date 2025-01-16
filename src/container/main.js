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
  _getNextId(data) {
    return data.length === 0 ? 1 : data[data.length - 1].id + 1;
  }
  async save(obj) {
    const date = new Date().toLocaleDateString("es-AR", {
      year: "numeric",
      day: "numeric",
      month: "long",
      weekday: "long",
    });

    try {
      const data = await this.listAll();
      const newID = this._getNextId(data);

      data.push({
        id: newID,
        ...obj,
        date,
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
