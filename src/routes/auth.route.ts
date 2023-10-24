import express from 'express';
import { userLogin } from '../controllers/auth/auth.controller';

// import { validateExampleMiddleware } from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/login', userLogin);

export default router;
