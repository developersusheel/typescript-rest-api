const express = require('express');
const routes = express.Router();
import {Response, Request} from 'express';
const {getProjects, getProject, createProject, updateProject, deleteProject} =  require('../controllers/projectControllers');

routes.get('/', getProjects);

routes.post('/', createProject);

routes.get('/:id', getProject);

routes.put('/:id', updateProject);

routes.delete('/:id', deleteProject);

module.exports = routes;