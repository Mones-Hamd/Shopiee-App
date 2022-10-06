import React, { useContext, useEffect } from 'react';
import { PostsContext } from '../../context/PostsCtx';
import { CircularProgress, Grid } from '@mui/material';
import Post from './Post/Post';
import classes from './Styles.module.css';
const Posts = () => {
  const { posts, getPosts } = useContext(PostsContext);
  useEffect(() => {
    (async () => {
      await getPosts('http://localhost:5000/api/posts');
    })();
  }, [posts]);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignitem="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
