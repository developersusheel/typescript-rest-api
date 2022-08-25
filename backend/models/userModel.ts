import {model} from 'mongoose';
import userSchema, { IUserTypeSchema } from '../schema/userSchema';

const UserModel = model<IUserTypeSchema>('User', userSchema);

export default UserModel;