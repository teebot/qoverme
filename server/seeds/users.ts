import * as Knex from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex("users").del();

  const hashedPassword = await bcrypt.hash("Ninja", 10);
  await knex("users").insert([
    { username: "Qover", email: "test@qover.com", password: hashedPassword }
  ]);
}
