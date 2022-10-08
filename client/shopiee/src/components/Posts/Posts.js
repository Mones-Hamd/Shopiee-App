import React, { useEffect } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import Post from './Post/Post';
import classes from './Styles.module.css';
import { useFetch } from '../../hooks/useFetch';

const Posts = () => {
  const { posts, err, isLoading } = useFetch('http://localhost:5000/api/posts');
  console.log(posts);
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
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
