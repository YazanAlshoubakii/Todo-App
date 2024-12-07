import express from 'express';
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllUsersWithTasks,
} from '../controllers/taskControllers.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all-tasks', protectRoute, getTasks);
router.post('/new-task', protectRoute, addTask);
router.put('/:id', protectRoute, updateTask);
router.delete('/:id', protectRoute, deleteTask);

router.get('/users/tasks', getAllUsersWithTasks);

export default router;
