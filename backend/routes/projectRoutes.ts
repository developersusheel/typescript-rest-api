import express from 'express';
const router = express.Router();
const {
  getProjectsHandler, 
  getProjectHandler, 
  createProjectHandler, 
  updateProjectHandler, 
  deleteProjectHandler
} =  require('../controllers/projectController');

router.route('/').get(getProjectsHandler).post(createProjectHandler);
// router.get('/', getProjects);
// router.post('/', createProject);

router.route('/:id').get(getProjectHandler).put(updateProjectHandler).delete(deleteProjectHandler);
// router.get('/:id', getProject);
// router.put('/:id', updateProject);
// router.delete('/:id', deleteProject);

module.exports = router;