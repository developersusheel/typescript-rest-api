import express from 'express';
import { protect } from "../middleware/authMiddleware";

const router = express.Router();
const {
  getProjectsHandler, 
  getProjectHandler, 
  createProjectHandler, 
  updateProjectHandler, 
  deleteProjectHandler
} =  require('../controllers/projectController');

router.route('/').get(getProjectsHandler).post(protect, createProjectHandler);
// router.get('/', getProjects);
// router.post('/', createProject);

router.route('/:id').get(getProjectHandler).put(protect, updateProjectHandler).delete(protect, deleteProjectHandler);
// router.get('/:id', getProject);
// router.put('/:id', updateProject);
// router.delete('/:id', deleteProject);

module.exports = router;