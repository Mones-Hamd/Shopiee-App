import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.js';
const router = express.Router();
router.get('/api/posts', getPosts);
router.get('/api/posts/:id', getPosts);
router.post('/api/posts', createPost);
router.put('/api/posts/:id', updatePost);
router.delete('/api/posts/:id', deletePost);
export default router;
