import React from 'react';
import { Grid, Grow, Container } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
const Home = () => {
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          // className={classes.gridContainer}
        >
          <Grid item={true} xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item={true} xs={12} sm={6} md={3}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
// <Search />
//            <Paper elevation={6}>
//<Pagination className={classes.pagination} />
//</Paper>