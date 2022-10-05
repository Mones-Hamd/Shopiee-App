import express from 'express';
import { getPosts } from '../controllers/posts.js';
const router = express.Router();
router.get('/api/posts', getPosts);

export default router;
