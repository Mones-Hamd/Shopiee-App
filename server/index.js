import express from 'express';

import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import { connectDb } from './connetion/connection.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '60mb', extended: true }));
app.use(cors());
app.use('/user', userRoutes);
app.use('/', postRoutes);

const PORT = process.env.PORT || 8080;

const main = async () => {
  try {
    await connectDb();
    await app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    throw err;
  }
};
main();
