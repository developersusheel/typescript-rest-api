import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';

import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from '../services/projectServices';
// import fetch from 'cross-fetch';

//@desc Get all projects from
//@route GET /api/projects
//@access Public
export const getProjectsHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const projects = await getProjects();
        res.status(200).json(projects);
    }
);

//@desc Create a new project
//@route GET /api/projects
//@access Private
export const createProjectHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const project = await createProject(req.body);
        res.status(200).json(project);
    }
);

//@desc Get a project a ID
//@route GET /api/projects/:id
//@access Public
export const getProjectHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const project = await getProjectById(req.params.id);
        res.status(200).json(project);
    }
);

//@desc Update a project
//@route PUT /api/projects
//@access Private
export const updateProjectHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const project = await updateProject(req.params.id, req.body);
        res.status(200).json(project);
    }
);

//@desc Delete a project by ID
//@route DELETE /api/projects/:id
//@access Private
export const deleteProjectHandler = asyncHandler(
    async (req: Request, res: Response) => {
        await deleteProject(req.params.id);
        res.status(200).json({ message: `Deleted project ${req.params.id}` });
    }
);

// module.exports = {
//     getProjectsHandler,
//     createProjectHandler,
//     getProjectHandler,
//     updateProjectHandler,
//     deleteProjectHandler,
// };
