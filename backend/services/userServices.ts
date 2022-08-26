import bcrypt from 'bcryptjs';
import userModel from '../models/userModel';
import { UserReturntype, UserType } from '../types/userTypes';
import { IUserTypeSchema } from '../schema/userSchema';
import { checkIdValidObjectId } from '../database/db';
import { sanitizeUser, sanitizeLoginUser } from '../sanitizers/sanitizeUser';
import HttpException from '../utils/httpException';
import { generateToken } from './tokenService';

export async function getUsers(): Promise<UserType[]> {
    try {
        const users = await userModel.find();
        if (!users) throw new HttpException('No users found', 400);
        return users;
    } catch (err) {
        throw new HttpException(`Error getting users ${err}`, 400);
    }
}

export async function createUser(user: UserType): Promise<UserReturntype> {
    const sanitizeuser = await sanitizeUser(user);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizeuser.password, salt);

    try {
        const newUser = await userModel.create({
            username: sanitizeuser.username,
            password: hashedPassword,
            email: sanitizeuser.email,
            isAdmin: sanitizeuser.isAdmin,
        });

        if (!newUser) throw new HttpException('User not created', 400);

        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            }),
        };
    } catch (err) {
        throw new HttpException(`Error creating user ${err.message}`, 400);
    }
}

export async function getUserById(userId: string): Promise<IUserTypeSchema> {
    checkIdValidObjectId(userId);
    try {
        const user = await userModel.findById(userId);
        if (!user) throw new HttpException('User not found', 400);
        return user;
    } catch (err) {
        throw new HttpException(`Error finding user ${err.message}`, 400);
    }
}

export async function loginUser(
    email: string,
    password: string
): Promise<UserReturntype> {
    const sanitizeUser = await sanitizeLoginUser(email, password);
    try {
        const user = await userModel.findOne({ email });
        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(
            sanitizeUser.password,
            user.password
        );
        if (!isPasswordValid)
            throw new HttpException('Password is invalid', 401);

        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            }),
        };
    } catch (err) {
        throw new HttpException(`Failed to login user ${err.message}`, 401);
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
        if (!updateUser) throw new HttpException('User not update', 404);
        return updateUser;
    } catch (err) {
        throw new HttpException(`Failed to update user ${err.message}`, 400);
    }
}

export async function deleteUser(userId: string): Promise<void> {
    checkIdValidObjectId(userId);
    try {
        const deleteUser = await userModel.findByIdAndDelete(userId);
        if (!deleteUser) throw new HttpException('User not deleted', 404);
        return;
    } catch (err) {
        throw new HttpException(`Error deleting user ${err.message}`, 400);
    }
}
