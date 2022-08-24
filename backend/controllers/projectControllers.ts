import {Response, Request} from 'express';
import mongoose from 'mongoose';
import ProjectModel from '../models/projectModels';
// import fetch from 'cross-fetch';

const asyncHandler = require('express-async-handler');

//@desc Get all projects from
//@route GET /api/projects
//@access Public
const getProjects = asyncHandler(async(req:Request, res:Response) =>{
  const projects = await ProjectModel.find();
  res.status(200).json(projects);
});

//@desc Create a new project
//@route GET /api/projects
//@access Private
const createProject = asyncHandler(async(req:Request, res:Response) =>{
  if(!req.body.title){
    res.status(400)
    throw new Error('Title is required');
  }
  const project = await ProjectModel.create(req.body);
  if(!project){
    res.status(404)
    throw new Error('Project not created');
  }
  res.status(200).json(project);
});

//@desc Get a project a ID
//@route GET /api/projects/:id
//@access Public
const getProject = asyncHandler(async(req:Request, res:Response) =>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(404);
    throw new Error(`${req.params.id} is not a valid ID`);
  }
  const project = await ProjectModel.findById(req.params.id);
  if(!project){
    res.status(404);
    throw new Error('Project not found');
  }

  res.status(200).json(project);
});

//@desc Update a project
//@route PUT /api/projects
//@access Private
const updateProject = asyncHandler(async(req:Request, res:Response) =>{
  if(!req.body.title){
    res.status(400)
    throw new Error('Title is required');
  }
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(404);
    throw new Error(`${req.params.id} is not a valid ID`);
  }
  const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  if(!project){
    res.status(404);
    throw new Error('Project not found');
  }
  res.status(200).json(project);
});

//@desc Delete a project by ID
//@route DELETE /api/projects/:id
//@access Private
const deleteProject = asyncHandler(async(req:Request, res:Response) =>{
  const project = await ProjectModel.findByIdAndDelete(req.params.id);
  if(!project){
    res.status(404);
    throw new Error('Project not found');
  }
  res.status(200).json({message: `Deleted project ${req.params.id}`});
});

module.exports = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject
}