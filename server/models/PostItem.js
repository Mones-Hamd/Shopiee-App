import mongoose from 'mongoose';
const PostSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  contact: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const PostItem = mongoose.model('Posts', PostSchema);
export default PostItem;
