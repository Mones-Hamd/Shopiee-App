import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Favorite = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  if (post?.likes?.length > 0) {
    return post.likes.find(
      (like) => like === (user?.result?.sub || user?.result?._id),
    ) ? (
      <>
        <FavoriteIcon fontSize="small" />
        &nbsp;
        {post?.likes?.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
      </>
    ) : (
      <>
        <FavoriteBorderIcon fontSize="small" />
        &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
      </>
    );
  }

  return (
    <>
      <FavoriteBorderIcon fontSize="small" />
      &nbsp;Like
    </>
  );
};

export default Favorite;
