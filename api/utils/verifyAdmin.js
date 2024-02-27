import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    const isadmin = user.isadmin;

    if (!isadmin) {
      console.log(req.user.isadmin);
      return next(errorHandler(403, "Forbidden - not admin"));
    }
    next();
  });
};
