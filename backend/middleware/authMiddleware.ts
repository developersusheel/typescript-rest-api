import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/httpException";
import { verifyToken } from "../services/tokenService";
import { getUserById } from "../services/userServices";
import { UserType } from "../types/userTypes";

const asyncHandler = require("express-async-handler");

export interface GetUserAuthInfoRequest extends Request {
  user: UserType
}

export const protect = asyncHandler(
  async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      throw new HttpException("Unauthorized access", 401);
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = await getUserById(decoded._id);
    next();
  }
);
