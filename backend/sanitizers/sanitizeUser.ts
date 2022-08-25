import { UserType } from "../types/userTypes";
import HttpException from "../utils/httpException";
import { emailRegex } from "../schema/userSchema";

export function sanitizeUser(users: UserType): UserType {
  let sanitizeUser = <UserType>{};
  sanitizeUser.email = sanitizeEmail(users.email);
  sanitizeUser.isAdmin = sanitizeIsAdmin(users.isAdmin);
  sanitizeUser.username = sanitizeUsername(users.username);
  sanitizeUser.password = users.password;
  
  return sanitizeUser;
}

function sanitizeUsername(username: string): string {
  // Types
  if (username === undefined) {
    throw new HttpException("Username is undefined", 400);
  }
  if (typeof username !== "string") {
    throw new HttpException("Username is not string", 400);
  }

  // Attributes
  username = username.trim();
  return username;
}

function sanitizeIsAdmin(isAdmin: boolean): boolean {
  // Types
  if (!isAdmin) isAdmin = false;

  return isAdmin;
}

function sanitizeEmail(email: string): string {
  // Types
  if (email === undefined) {
    throw new HttpException("Email is undefined", 400);
  }
  if (typeof email !== "string") {
    throw new HttpException("Email is not string", 400);
  }
  if (email.length < 6) {
    throw new HttpException("Email length must be at least 6 characters", 400);
  }

  if (email.length > 50) {
    throw new HttpException(
      "Email length must be less that 50 characters",
      400
    );
  }

  if (!email.match(emailRegex)) {
    throw new HttpException("Please enter a valid email", 400);
  }

  // Attributes
  email = email.trim();
  return email;
}
