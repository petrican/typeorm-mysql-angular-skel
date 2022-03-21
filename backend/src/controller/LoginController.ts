import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Md5 } from "ts-md5/dist/md5";
import * as jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const userRepository = getRepository(User);
    // find user in the DB
    const user = await userRepository.findOne({
      where: [
        { user_login: username, user_pass: Md5.hashStr(password) },
        { user_email: username, user_pass: Md5.hashStr(password) },
      ],
    });
    if (user) {
      const userData = {
        username: user.user_login,
        user_full_name: user.user_fullname,
        user_email: user.user_email,
        user_role: user.user_role,
        user_status: user.user_status,
      };
      const token = jwt.sign(userData, process.env.SECRET_KEY, {
        expiresIn: "8h",
      });

      return res.json({ auth: true, token, expires_in: 28800, ...userData });
    } else {
      return res.status(401).send({ error: { message: "Unauthorized." } });
    }
  } catch (err) {
    return res.status(500).send({ error: { message: "Invalid payload." } });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.json({ auth: false, Token: null });
};
