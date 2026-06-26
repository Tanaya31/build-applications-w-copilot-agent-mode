import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { connectToDatabase } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
