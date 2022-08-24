import {Schema} from 'mongoose';
import { ProjectType } from '../types/projectTypes';

export interface IProjectTypeSchema extends ProjectType{
  _id: string;
}

const projectSchema = new Schema<ProjectType>({
  title: {
    type: 'string',
    required: true,
    unique: true
  }
}, {
  timestamps: true,
});

export default projectSchema;