import { Router } from 'express';
import {
  createShareLink,
  getUserContent,
} from '../controllers/shareController';
import authMiddleware from '../middlewares/authMiddleware';

const shareRouter = Router();

shareRouter.post('/share', authMiddleware, createShareLink);
shareRouter.get('/:shareLink', getUserContent);

export default shareRouter;
