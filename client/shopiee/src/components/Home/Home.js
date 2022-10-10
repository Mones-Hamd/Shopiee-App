import React, { useContext, useState } from 'react';
import { Grid, Grow, Container } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Search from './Searchbar/Search';
import classes from './Styles.module.css';
import Paginate from '../Pagination';

import { PostsContext } from '../../context/PostsCtx';

const Home = () => {
  const { err, isLoading, posts } = useContext(PostsContext);
  const [render, setRender] = useState(true);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <div className={classes.secondBar}>
          <Search />
          <Paginate render={render} />
        </div>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.container}
        >
          <Grid item={true} xs={12} sm={6} md={9}>
            <Posts posts={posts} setRender={setRender} />
          </Grid>
          <Grid item={true} xs={12} sm={6} md={3}>
            <Form setRender={setRender} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
