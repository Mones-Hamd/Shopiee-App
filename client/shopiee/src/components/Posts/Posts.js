import React, { useContext, useEffect, useState } from 'react';

import { CircularProgress, Grid, Typography } from '@mui/material';
import Post from './Post/Post';
import classes from './Styles.module.css';
import { PostsContext } from '../../context/PostsCtx';

const Posts = () => {
  const [render, setRender] = useState(false);
  const { posts, err, isLoading, getPosts } = useContext(PostsContext);
  useEffect(() => {
    getPosts(`http://localhost:5000/api/posts`);
  }, [render]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignitem="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} lg={3}>
          <Post post={post} setRender={setRender} />
        </Grid>
      ))}
      {err && (
        <Typography variant="h3" gutterBottom>
          Something went wrong!.. try again later{' '}
        </Typography>
      )}
    </Grid>
  );
};

export default Posts;
