import express from 'express';
import {
  getAllSensors,
  getDistinctGroupName,
  getSensorByGroup,
  addSensor,
  // insertMany,
} from '../controllers/sensor/sensor.controler';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', auth, addSensor);
router.get('/distinct', auth, getDistinctGroupName);
router.get('/:group', auth, getSensorByGroup);
router.get('/', auth, getAllSensors);
// router.post('/many', insertMany);
export default router;
