import { ContenedorService } from "../src/services/operaciones.service.js";
import { Error } from "../src/classes/error.js";
const contenedorApp = new ContenedorService();

export const controllers = {
  homeView: async (req, res) => {
    const task = await contenedorApp.listTask();

    res.render("index", {
      message: req.flash("success_msg"),
      title: "Home",
      task,
    });
  },
  formView: (req, res) => {
    res.render("form", {
      message: req.flash("err-task"),
      title: "Form",
    });
  },
  formData: async (req, res) => {
    try {
      await contenedorApp.addTask(req);
      req.flash("success_msg", "Task add succesfully.");
      res.redirect("/");
    } catch (error) {
      throw new Error(500, "Task not saved", error);
    }
  },
  formDelete: async (req, res) => {
    try {
      await contenedorApp.deleteTask(req);
      req.flash("success_msg", "Task deleted successfully.");
      res.redirect("/");
    } catch (error) {
      throw new Error(500, "Task not deleted", error);
    }
  },
};
