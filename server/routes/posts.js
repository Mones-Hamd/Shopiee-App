import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/posts.js';
const router = express.Router();
router.get('/api/posts', getPosts);
router.post('/api/posts', createPost);
router.put('/api/post/:id', updatePost);
export default router;
