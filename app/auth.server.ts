// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "session.server";
import { IUser } from "~/models/user";
import { checkPassword } from "./utils/auth";
import database from "./postgrest/database";

export let authenticator = new Authenticator<IUser>(sessionStorage, {
  sessionErrorKey: "auth-error",
  sessionKey: "auth",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get("username") as string;
    const password = form.get("password") as string;

    if (!username) {
      throw new Error("Username is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    if (typeof password !== "string") {
      throw new Error("Invalid password");
    }

    // Identify User based on Username
    const user = await database.findOne("user", { username });
    if (!user) {
      throw new Error("Invalid username");
    }

    if (!user.password) {
      throw new Error("Invalid password");
    }

    // Check the user's password
    const isPasswordValid = await checkPassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Return instance of IUser Entity
    return user;
  }),
  "user-pass"
);
