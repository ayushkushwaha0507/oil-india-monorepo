import express from 'express';
import { upload } from '../middlewares/fileUpload';
import { fileUploadController } from '../controllers/fileUploadController';

const router = express.Router();

// 👇 Fix overload issue by explicitly casting to RequestHandler
const safeUpload = upload.array('files', 10) as express.RequestHandler;

router.post(
  '/project',
  safeUpload,
  fileUploadController.createProjectController
);

router.get(
  '/project/search',
  fileUploadController.searchProjectsController
);
router.get('/project/:id', fileUploadController.getProjectByIdController);

export default router;
