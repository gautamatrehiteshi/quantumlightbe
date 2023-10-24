import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import sensorRoutes from './sensor.route';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/sensor', sensorRoutes);
export default router;
