import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import Post from './Post/Post';
import classes from './Styles.module.css';
import { PostsContext } from '../../context/PostsCtx';
import Notifications from '../Notifications/Notifications';

const Posts = () => {
  const { posts } = useContext(PostsContext);
  return (
    <Grid
      className={classes.mainContainer}
      container
      alignitem="stretch"
      spacing={1}
    >
      <Notifications />
      {posts.map((post) => (
        <Grid
          key={post._id}
          item
          xs={6}
          sm={3}
          lg={2.4}
          className={classes.cardGrid}
        >
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
