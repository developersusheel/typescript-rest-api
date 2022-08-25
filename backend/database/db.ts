import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config";
import * as Colors from "colors.ts";
import HttpException from "../utils/httpException";
Colors.colors("", "");

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.log("MONGO_URL is not defined in the env file".red.underline.bold);
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connect".white.underline.bold);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export function checkIdValidObjectId(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpException(`${id} is not a valid ID`, 400);
  }
}
