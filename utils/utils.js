import { fileURLToPath } from "url";
import { dirname } from "path";

export function url(data) {
  const __filename = fileURLToPath(data);
  const __dirname = dirname(__filename);
  return __dirname;
}
export function verify(req, res, next) {
  let { title } = req.body;

  if (title === "") {
    req.flash("err-task", "Fields cannot be empty.");
    res.redirect("/create");
  } else {
    return next();
  }
}
