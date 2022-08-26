import { model } from 'mongoose';
import projectSchema, { IProjectTypeSchema } from '../schema/projectSchema';

const ProjectModel = model<IProjectTypeSchema>('Project', projectSchema);

export default ProjectModel;
