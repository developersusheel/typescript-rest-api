import { Response, Request } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/projectServices";
// import fetch from 'cross-fetch';

const asyncHandler = require("express-async-handler");

//@desc Get all projects from
//@route GET /api/projects
//@access Public
const getProjectsHandler = asyncHandler(async (req: Request, res: Response) => {
  const projects = await getProjects();
  res.status(200).json(projects);
});

//@desc Create a new project
//@route GET /api/projects
//@access Private
const createProjectHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await createProject(req.body);
    res.status(200).json(project);
  }
);

//@desc Get a project a ID
//@route GET /api/projects/:id
//@access Public
const getProjectHandler = asyncHandler(async (req: Request, res: Response) => {
  const project = await getProjectById(req.params.id);
  res.status(200).json(project);
});

//@desc Update a project
//@route PUT /api/projects
//@access Private
const updateProjectHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await updateProject(req.params.id, req.body);
    res.status(200).json(project);
  }
);

//@desc Delete a project by ID
//@route DELETE /api/projects/:id
//@access Private
const deleteProjectHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await deleteProject(req.params.id);
    res.status(200).json({ message: `Deleted project ${req.params.id}` });
  }
);

module.exports = {
  getProjectsHandler,
  createProjectHandler,
  getProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
};
