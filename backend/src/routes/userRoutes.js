import express from 'express';
import { signup, forgetPassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/forgot-password', forgetPassword);

export default router;
