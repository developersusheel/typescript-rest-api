const express = require('express');
const routes = express.Router();
import {Response, Request} from 'express';

routes.get('/', (req:Request, res:Response) =>{
  res.json({message: 'Get all projects'})
})

routes.post('/', (req:Request, res:Response) =>{
  res.json({message: 'Create a project'})
})

routes.get('/:id', (req:Request, res:Response) =>{
  res.json({message: `Get project ${req.params.id}`});
})

routes.put('/:id', (req:Request, res:Response) =>{
  res.json({message: `Update project ${req.params.id}`});
})

routes.delete('/:id', (req:Request, res:Response) =>{
  res.json({message: `Delete project ${req.params.id}`});
})

module.exports = routes;