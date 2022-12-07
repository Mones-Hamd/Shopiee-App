import React, { useContext, useState } from 'react';
import { Grid, Grow, Container } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import classes from './Styles.module.css';
import Paginate from '../Pagination';

import { PostsContext } from '../../context/PostsCtx';
import { useLocation } from 'react-router-dom';
import ToolBar from '../ToolBar/ToolBar';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Home = () => {
  const { err, isLoading, posts } = useContext(PostsContext);
  const [render, setRender] = useState(true);
  const query = useQuery();

  const page = query.get('page') || 1;

  const searchQuery = query.get('searchQuery');
  return (
    <>
      <ToolBar />
      <Grow in>
        <Container maxWidth="xl">
          <Paginate render={render} page={page} />

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
    </>
  );
};

export default Home;
