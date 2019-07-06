import { db } from "./../db/db";

export const userRepository = {
  findUserByUserName: username =>
    db("users")
      .where({ username })
      .first()
};
