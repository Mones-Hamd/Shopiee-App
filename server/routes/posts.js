import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.js';
import auth from '../middl/auth.js';
const router = express.Router();
router.get('/api/posts', getPosts);
router.get('/api/posts/:id', getPosts);
router.post('/api/posts', auth, createPost);
router.put('/api/posts/:id', auth, updatePost);
router.delete('/api/posts/:id', auth, deletePost);
export default router;
