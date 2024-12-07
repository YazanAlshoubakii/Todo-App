import express from 'express';
import {
  checkAuth,
  loginController,
  logoutController,
  signupController,
} from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.get('/check', protectRoute, checkAuth);

export default router;
