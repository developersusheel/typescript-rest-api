import express from 'express';
import { PORT } from './utils/config';
import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './database/db';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';

connectDB();

const app = express();
app.use(express.json());

// Project Routes
app.use('/api/projects', projectRoutes);

// User Routes Schema
app.use('/api/users', userRoutes);

// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started to listen on ${PORT}`);
});
