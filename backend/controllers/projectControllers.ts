import {Response, Request} from 'express';
import fetch from 'cross-fetch';


//@desc Get all projects from
//@route GET /api/projects
//@access Public
const getProjects = (req:Request, res:Response) =>{
  // res.status(200).json({message: 'Get all projects'})
  fetch('https://organic-backend.test/wp-json/wp-api-menus/v2/menus/')
  .then(response => response.json())
  .then(data => console.log(JSON.stringify(data)))
};

//@desc Create a new project
//@route GET /api/projects
//@access Private
const createProject = (req:Request, res:Response) =>{
  if(!req.body.title){
    res.status(400)
    throw new Error('Title is required');
  }
  res.status(200).json({message: 'Create a project'})
};

//@desc Get a project a ID
//@route GET /api/projects/:id
//@access Public
const getProject = (req:Request, res:Response) =>{
  // res.json({message: `Get project ${req.params.id}`});
  fetch('http://organic-backend.test/wp-json/wp-api-menus/v2/menus/')
  .then(response => response.json())
  .then(data => res.json(data))
  // res.json({message: `Get project ${req.params.id}`});
};

//@desc Update a project
//@route PUT /api/projects
//@access Private
const updateProject = (req:Request, res:Response) =>{
  res.json({message: `Update project ${req.params.id}`});
};

//@desc Delete a project by ID
//@route DELETE /api/projects/:id
//@access Private
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