import * as express from "express";
import {PORT} from './utils/config';

const app = express();
app.use(express.json());

// Project Routes
app.use('/api/projects', require('./routes/projectRoutes'));

app.listen(PORT, ()=>{console.log(`Server started to listen on ${PORT}`);});