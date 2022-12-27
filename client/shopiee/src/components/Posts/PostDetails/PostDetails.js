import React, { useContext, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import classes from './Styles.module.css';
import { useParams } from 'react-router-dom';
import { PostsContext } from '../../../context/PostsCtx';
import moment from 'moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comments from './Comments/Comments';
import { usePosts } from '../../../hooks/usePosts';
import Notifications from '../../Notifications/Notifications';
import Recommended from './RecommendedPosts/Reecommended';
const PostDetails = () => {
  const { id } = useParams();
  const { getPost } = usePosts(null, id);
  useEffect(() => {
    getPost.perform();
  }, [id]);
  const { post } = useContext(PostsContext);

  if (getPost.isLoading) {
    return (
      <Paper elevation={6} className={classes.loading}>
        <CircularProgress size="6em" />
      </Paper>
    );
  }
  return (
    <Paper style={{ padding: '20px' }} elevation={6}>
      <Notifications />
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.description}
          </Typography>
          <Typography variant="h6">Posted By: {post.name}</Typography>

          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Typography variant="overline">Price: {post.price} €</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Reach me :{post.contact}
          </Typography>
          <div className={classes.actions}>
            <FavoriteIcon fontSize="small" />
            &nbsp; {post?.likes?.length}
          </div>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />

          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      <Comments post={post} />
      <Recommended post={post} />
    </Paper>
  );
};

export default PostDetails;
