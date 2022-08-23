import {Response, Request} from 'express';

const getProjects = (req:Request, res:Response) =>{
  res.status(200).json({message: 'Get all projects'})
};

const createProject = (req:Request, res:Response) =>{
  res.json({message: 'Create a project'})
};

const getProject = (req:Request, res:Response) =>{
  res.json({message: `Get project ${req.params.id}`});
};

const updateProject = (req:Request, res:Response) =>{
  res.json({message: `Update project ${req.params.id}`});
};

const deleteProject = (req:Request, res:Response) =>{
  res.json({message: `Delete project ${req.params.id}`});
}

module.exports = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject
}