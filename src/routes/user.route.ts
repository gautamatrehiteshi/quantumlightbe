import express from 'express';
import {
  createUser,
  getCurrentUser,
  updateUser,
  changePassword,
} from '../controllers/user/user.controller';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', createUser);
router.get('/me', auth, getCurrentUser);
router.put('/', auth, updateUser);
router.put('/change_password', auth, changePassword);
export default router;
