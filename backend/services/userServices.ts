import bcrypt from "bcryptjs";
import userModel from "../models/userModel";
import { UserType } from "../types/userTypes";
import { IUserTypeSchema } from "../schema/userSchema";
import { checkIdValidObjectId } from "../database/db";
import { sanitizeUser, sanitizeLoginUser } from "../sanitizers/sanitizeUser";

export async function getUsers(): Promise<UserType[]> {
  try {
    const users = await userModel.find();
    if (!users) throw new Error("No users found");
    return users;
  } catch (err) {
    throw new Error(`Error getting users ${err}`);
  }
}

export async function createUser(user: UserType): Promise<UserType> {
  const sanitizeuser = await sanitizeUser(user);

  try {
    const newUser = await userModel.create(sanitizeuser);
    if (!newUser) throw new Error("User not created");
    return newUser;
  } catch (err) {
    throw new Error(`Error creating user ${err.message}`);
  }
}

export async function getUserById(userId: string): Promise<IUserTypeSchema> {
  checkIdValidObjectId(userId);
  try {
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    throw new Error(`Error finding user ${err.message}`);
  }
}

export async function loginUser(email: string, password: string): Promise<UserType>{
  const sanitizeUser = await sanitizeLoginUser(email, password);
  try {
    const sanitizeUser = await userModel.findOne({email});
    if (!sanitizeUser) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, sanitizeUser.password);
    if(!isPasswordValid)  throw new Error(`Password is invalid`);

    return sanitizeUser;
  } catch (err) {
    throw new Error(`Error finding user ${err.message}`);
  }
}

export async function updateUser(
  userId: string,
  user: UserType
): Promise<IUserTypeSchema> {
  checkIdValidObjectId(userId);
  const sanitizeproject = sanitizeUser(user);
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      sanitizeproject,
      { new: true }
    );
    if (!updateUser) throw new Error("User not update");
    return updateUser;
  } catch (err) {
    throw new Error(`Error updating user ${err.message}`);
  }
}

export async function deleteUser(userId: string): Promise<void> {
  checkIdValidObjectId(userId);
  try {
    const deleteUser = await userModel.findByIdAndDelete(userId);
    if (!deleteUser) throw new Error("User not deleted");
    return;
  } catch (err) {
    throw new Error(`Error deleting user ${err.message}`);
  }
}
