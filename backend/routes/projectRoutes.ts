const express = require('express');
const router = express.Router();
const {
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject
} =  require('../controllers/projectControllers');

router.route('/').get(getProject).post(createProject);
// router.get('/', getProjects);
// router.post('/', createProject);

router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);
// router.get('/:id', getProject);
// router.put('/:id', updateProject);
// router.delete('/:id', deleteProject);

module.exports = router;