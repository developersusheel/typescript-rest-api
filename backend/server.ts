import * as express from "express";
import {PORT} from './utils/config';
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();
app.use(express.json());

// Project Routes
app.use('/api/projects', require('./routes/projectRoutes'));

// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, ()=>{console.log(`Server started to listen on ${PORT}`);});