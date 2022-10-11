import React, { useContext, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import classes from './Styles.module.css';
import { useParams } from 'react-router-dom';
import { PostsContext } from '../../../context/PostsCtx';
import moment from 'moment';

const PostDetails = () => {
  const { id } = useParams();
  const { posts: post, getPosts, isLoading } = useContext(PostsContext);
  useEffect(() => {
    getPosts(`http://localhost:5000/api/posts/${id}`);
  }, [id]);
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loading}>
        <CircularProgress size="6em" />
      </Paper>
    );
  }
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post[0].title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post[0].tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post[0].description}
          </Typography>
          <Typography variant="h6">Created by: {post[0].name}</Typography>

          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Typography variant="overline">Price: {post[0].price} €</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Reach me :{post[0].contact}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post[0].selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post[0].title}
          />
        </div>
      </div>
    </Paper>
  );
};

export default PostDetails;
