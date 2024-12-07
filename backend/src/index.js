import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import router from './routes/taskRoutes.js';
import authRoutes from './routes/authRouter.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/tasks', router);
app.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
