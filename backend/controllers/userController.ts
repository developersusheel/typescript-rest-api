import { Response, Request } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  updateUser,
} from "../services/userServices";
// import fetch from 'cross-fetch';

const asyncHandler = require("express-async-handler");

//@desc Get all users from
//@route GET /api/users
//@access Public
const getUsersHandler = asyncHandler(async (req: Request, res: Response) => {
  const users = await getUsers();
  res.status(200).json(users);
});

//@desc Create a new User
//@route POST /api/User
//@access Public
const createUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const createdUser = await createUser(req.body);
  res.status(201).json(createdUser);
});

//@desc Login a new User
//@route POST /api/Login
//@access Public
const loginUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const loginUserHandler = await loginUser(req.body.email, req.body.password);
  res.status(201).json(loginUserHandler);
});

//@desc Get a user a ID
//@route GET /api/users/:id
//@access Public
const getUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  res.status(200).json(user);
});

//@desc Update a user
//@route PUT /api/users
//@access Private
const updateUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await updateUser(req.params.id, req.body);
  res.status(200).json(user);
});

//@desc Delete a user by ID
//@route DELETE /api/users/:id
//@access Private
const deleteUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await deleteUser(req.params.id);
  res.status(200).json({ message: `Deleted user ${req.params.id}` });
});

module.exports = {
  getUsersHandler,
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler
};
