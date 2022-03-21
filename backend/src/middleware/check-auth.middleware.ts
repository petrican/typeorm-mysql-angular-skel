import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("TOKEN:", token);

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
          return res.status(401).send({ error: { message: "Unauthorized." } });
        } else {
          console.log("decodedToken:", decodedToken);
          next();
        }
      });
    } else {
      return res.status(401).send({ error: { message: "Unauthorized." } });
    }
  } catch (error) {
    return res.status(401).send({ error: { message: "Unauthorized." } });
  }
};
