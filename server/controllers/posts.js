import mongoose from 'mongoose';
import PostItem from '../models/PostItem.js';
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 15;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostItem.countDocuments({});
    const posts = await PostItem.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      success: true,
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ msg: err.msg });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostItem({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save(newPost);
    res.status(201).json({
      success: true,
      newPost,
      message: 'Item has published successfully!',
    });
  } catch (err) {
    res.status(409).json({ msg: err.msg });
  }
};
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');
  const updatedPost = await PostItem.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json({
    success: true,
    updatedPost,
    message: 'Item has updated successfully!',
  });
};
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that ${id}`);
  await PostItem.findByIdAndRemove(id);
  res.json({
    success: true,
    message: 'Item has deleted successfully',
  });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) res.json({ message: 'Unauthnticated' });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that ${id}`);
  const post = await PostItem.findById(id);
  const isLiked = await post.likes.findIndex((id) => id === String(req.userId));

  if (isLiked === -1) {
    await post.likes.push(req.userId);
  } else {
    post.likes = await post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostItem.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json({
    success: true,
    updatedPost,
    message: null,
  });
};
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i');

    const posts = await PostItem.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostItem.findById(id);

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentOnPost = async (req, res) => {
  const { id } = req.params;

  const comment = req.body;

  if (!req.userId) res.json({ message: 'Unauthnticated' });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that ${id}`);
  const post = await PostItem.findById(id);
  await post.comments.push(comment.userComment);
  const updatedPost = await PostItem.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: updatedPost,
    message: 'Comment has added successfully!',
  });
};
