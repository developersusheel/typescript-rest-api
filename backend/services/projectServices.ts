import ProjectModel from "../models/projectModels";
import { ProjectType } from "../types/projectTypes";
import { IProjectTypeSchema } from "../schema/projectSchema";
import { checkIdValidObjectId } from "../database/db";
import { sanitizeProject } from "../sanitizers/sanitizeProject";

export async function getProjects(): Promise<ProjectType[]> {
  try {
    const projects = await ProjectModel.find();
    if (!projects) throw new Error("No project found");
    return projects;
  } catch (err) {
    throw new Error(`Error getting project ${err.message}`);
  }
}

export async function createProject(
  project: ProjectType
): Promise<ProjectType> {
  const sanitizeproject = sanitizeProject(project);
  try {
    const newProject = await ProjectModel.create(sanitizeproject);
    if (!newProject) throw new Error("Project not created");
    return newProject;
  } catch (err) {
    throw new Error(`Error creating project ${err.message}`);
  }
}

export async function getProjectById(
  projectId: string
): Promise<IProjectTypeSchema> {
  checkIdValidObjectId(projectId);
  try {
    const project = await ProjectModel.findById(projectId);
    if (!project) throw new Error("Project not found");
    return project;
  } catch (err) {
    throw new Error(`Error finding project ${err.message}`);
  }
}

export async function updateProject(
  projectId: string,
  project: ProjectType
): Promise<IProjectTypeSchema> {
  checkIdValidObjectId(projectId);
  const sanitizeproject = sanitizeProject(project);
  try {
    const updateProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      sanitizeproject,
      { new: true }
    );
    if (!updateProject) throw new Error("Project not update");
    return updateProject;
  } catch (err) {
    throw new Error(`Error updating project ${err.message}`);
  }
}

export async function deleteProject(projectId: string): Promise<void> {
  checkIdValidObjectId(projectId);
  try {
    const deleteProject = await ProjectModel.findByIdAndDelete(projectId);
    if (!deleteProject) throw new Error("Project not update");
    return;
  } catch (err) {
    throw new Error(`Error deleting project ${err.message}`);
  }
}
