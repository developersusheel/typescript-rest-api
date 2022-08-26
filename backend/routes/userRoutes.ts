import express from 'express';
import { protect } from '../middleware/authMiddleware';
const userRoutes = express.Router();

import {
    getUsersHandler,
    createUserHandler,
    getUserHandler,
    updateUserHandler,
    deleteUserHandler,
    loginUserHandler,
} from '../controllers/userController';

userRoutes.route('/').get(protect, getUsersHandler).post(createUserHandler);
userRoutes.route('/login').post(loginUserHandler);
userRoutes
    .route('/:id')
    .get(getUserHandler)
    .put(protect, updateUserHandler)
    .delete(protect, deleteUserHandler);

// module.exports = router;
export default userRoutes;
