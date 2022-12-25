import React from 'react';
import { Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLike } from '../../../hooks/useLike';
const Favorite = ({ post }) => {
  const { like, likes, setLikes } = useLike(post);
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.sub || user?.result?._id;
  const isLiked = likes?.find((like) => like === userId);
  const handleFavourite = async (e) => {
    e.preventDefault();
    like.perform();
    if (isLiked) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };
  if (likes.length > 0) {
    return isLiked ? (
      <Button
        size="small"
        color="primary"
        disabled={!user?.result}
        onClick={handleFavourite}
      >
        <FavoriteIcon fontSize="small" />
        &nbsp;
        {likes?.length > 2
          ? `You and ${likes.length - 1} others`
          : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
      </Button>
    ) : (
      <Button
        size="small"
        color="primary"
        disabled={!user?.result}
        onClick={handleFavourite}
      >
        <FavoriteBorderIcon fontSize="small" />
        &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
      </Button>
    );
  }

  return (
    <Button
      size="small"
      color="primary"
      disabled={!user?.result}
      onClick={handleFavourite}
    >
      <FavoriteBorderIcon fontSize="small" />
      &nbsp;Like
    </Button>
  );
};

export default Favorite;
