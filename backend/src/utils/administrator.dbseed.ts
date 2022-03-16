import { Connection, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Md5 } from "ts-md5/dist/md5";

export class AdministratorDbSeed {
  constructor(private connection: Connection) {}

  async createAdmin() {
    const userRepository = getRepository(User);
    let adminUser = await userRepository.findOne({ user_login: "admin" });

    if (!adminUser) {
      // insert new users for test
      await this.connection.manager.save(
        this.connection.manager.create(User, {
          user_login: "admin",
          user_pass: Md5.hashStr("password"),
          user_fullname: "Administrator",
          user_role: "administrator",
          user_email: "admin@admin.com",
          user_activation_key: "123456",
          user_status: 1,
        })
      );
    }
  }
}
