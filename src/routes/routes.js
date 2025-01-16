import express from "express";
const routes = express.Router();

import { controllers } from "../../controllers/controllers.js";
import { verify } from "../../utils/utils.js";

routes.get("/", controllers.homeView);
routes.get("/create", controllers.formView);
routes.get("/delete/:id", controllers.formDelete);
routes.post("/form", verify, controllers.formData);

export default routes;
