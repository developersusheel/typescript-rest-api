import ProjectModel from '../models/projectModels';
import { ProjectType } from '../types/projectTypes';
import {IProjectTypeSchema} from '../schema/projectSchema';

export async function getProjects(): Promise<ProjectType[]>{
  try{
    const projects = await ProjectModel.find();
    if(!projects) throw new Error('No project found');
    return projects;
  }catch(err){
    throw new Error('Error getting project');
  }  
}

export async function createProject(project: ProjectType): Promise<ProjectType>{
  try{
    const newProject = await ProjectModel.create(project);
    if(!newProject) throw new Error('Project not created');
    return newProject;
  }catch(err){
    throw new Error('Error creating project');
  }
}

export async function getProjectById(projectId: string): Promise<IProjectTypeSchema>{
  try {
    const project = await ProjectModel.findById(projectId);
    if(!project) throw new Error('Project not found');
    return project;
  } catch (err) {
    throw new Error('Error finding project');
  }
}

export async function updateProject(projectId: string, project: ProjectType): Promise<IProjectTypeSchema>{
  try {
    const updateProject = await ProjectModel.findByIdAndUpdate(projectId, project, {new:true});
    if(!updateProject) throw new Error('Project not update');
    return updateProject;
  } catch (err) {
    throw new Error('Error updating project');
  }
}

export async function deleteProject(projectId: string): Promise<void>{
  try {
    const deleteProject = await ProjectModel.findByIdAndDelete(projectId);
    if(!deleteProject) throw new Error('Project not update');
    return;
  } catch (err) {
    throw new Error('Error deleting project');
  }
}