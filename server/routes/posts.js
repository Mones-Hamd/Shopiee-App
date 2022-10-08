import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/posts.js';
const router = express.Router();
router.get('/api/posts', getPosts);
router.get('/api/posts/:id', getPosts);
router.post('/api/posts', createPost);
router.put('/api/posts/:id', updatePost);
export default router;
