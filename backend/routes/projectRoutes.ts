import express from 'express';
import { protect } from '../middleware/authMiddleware';

const projectRoutes = express.Router();
import {
    getProjectsHandler,
    getProjectHandler,
    createProjectHandler,
    updateProjectHandler,
    deleteProjectHandler,
} from '../controllers/projectController';

projectRoutes
    .route('/')
    .get(getProjectsHandler)
    .post(protect, createProjectHandler);
// router.get('/', getProjects);
// router.post('/', createProject);

projectRoutes
    .route('/:id')
    .get(getProjectHandler)
    .put(protect, updateProjectHandler)
    .delete(protect, deleteProjectHandler);
// router.get('/:id', getProject);
// router.put('/:id', updateProject);
// router.delete('/:id', deleteProject);

// module.exports = router;
export default projectRoutes;
