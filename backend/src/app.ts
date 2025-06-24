import express from 'express';
import { config } from './config/config';

const app = express();

app.use(express.json()); // Parse JSON bodies

// TODO: Add routes here later
app.get('/health', (req, res) => {
  res.json({ status: 'OK', environment: config.NODE_ENV });
});

export default app;
