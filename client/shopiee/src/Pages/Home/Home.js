import React, { useContext, useState } from 'react';
import { Grid, Grow, Container, Divider } from '@mui/material';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';

import classes from './Styles.module.css';
import Paginate from '../../components/Pagination';

import { PostsContext } from '../../context/PostsCtx';
import { useLocation } from 'react-router-dom';
import ToolBar from '../../components/ToolBar/ToolBar';
import SideBar from '../../components/SideBar/SideBar';
import AddItem from '../../components/AddItem/AddItem';

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
        <Container maxWidth="xl" className={classes.main}>
          <SideBar />
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.container}
          >
            <Grid item={true} xs={12} sm={6} md={12} className={classes.cards}>
              <AddItem />
              <Divider />
              <Posts posts={posts} setRender={setRender} />
            </Grid>
          </Grid>
          <Paginate render={render} page={page} />
        </Container>
      </Grow>
    </>
  );
};

export default Home;
