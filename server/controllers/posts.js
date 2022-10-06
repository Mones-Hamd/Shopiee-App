import mongoose from 'mongoose';
import PostItem from '../models/PostItem.js';
export const getPosts = async (req, res) => {
  try {
    const postItem = await PostItem.find();
    res.status(200).json(postItem);
  } catch (err) {
    res.status(404).json({ msg: err.msg });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostItem(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
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
  res.json(updatedPost);
};
