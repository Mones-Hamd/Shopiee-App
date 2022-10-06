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
