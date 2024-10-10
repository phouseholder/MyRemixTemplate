import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { getSession } from "session.server";
import { redirect } from "@remix-run/node";

const scryptAsync = promisify(scrypt);

export async function checkPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const [salt, key] = hashedPassword.split(":");
  const hashedBuffer = await scryptAsync(plainPassword, salt, 64);

  //@ts-ignore
  return key === hashedBuffer.toString("hex");
}

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hashedPasswordBuffer = await scryptAsync(password, salt, 64);
  //@ts-ignore
  const hashedPassword = `${salt}:${hashedPasswordBuffer.toString("hex")}`;
  return hashedPassword;
};