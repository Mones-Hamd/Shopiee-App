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
