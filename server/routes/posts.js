import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  commentOnPost,
} from '../controllers/posts.js';
import auth from '../middl/auth.js';
const router = express.Router();
router.get('/api/posts', getPosts);
router.get('/api/posts/:id', getPost);
router.get('/api/search', getPostsBySearch);
router.post('/api/posts', auth, createPost);
router.put('/api/posts/:id', auth, updatePost);
router.delete('/api/posts/:id', auth, deletePost);
router.put('/api/posts/:id/likes', auth, likePost);
router.put('/api/posts/:id/comments', auth, commentOnPost);
export default router;
