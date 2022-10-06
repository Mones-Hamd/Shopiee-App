import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';
const router = express.Router();
router.get('/api/posts', getPosts);
router.post('/api/posts', createPost);

export default router;
