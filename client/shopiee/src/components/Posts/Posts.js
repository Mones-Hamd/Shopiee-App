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
      spacing={3}
    >
      <Notifications />
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} lg={3}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
