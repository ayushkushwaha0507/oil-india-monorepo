import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { config } from './config/config';
import fileUploadRoutes from './routes/fileUploadRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the file upload route
app.use('/api/files', fileUploadRoutes);



// TODO: Add routes here later
app.get('/health', (req, res) => {
  res.json({ status: 'OK', environment: config.NODE_ENV });
});

export default app;
