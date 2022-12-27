import React, { useEffect, useState, useContext } from 'react';
import { Grid, Grow, Container, Divider, Typography } from '@mui/material';
import Posts from '../../components/Posts/Posts';
import classes from './Styles.module.css';
import Paginate from '../../components/Pagination';
import { useLocation } from 'react-router-dom';
import ToolBar from '../../components/ToolBar/ToolBar';
import SideBar from '../../components/SideBar/SideBar';
import AddItem from '../../components/AddItem/AddItem';
import { IoIosArrowForward } from 'react-icons/io';
import { IoChevronBackSharp } from 'react-icons/io5';
import { usePosts } from '../../hooks/usePosts';
import ConfirmationMessage from '../../components/ConfirmationMsg/ConfirmationMessage';
import { ConfirmationMessageContext } from '../../context/ConMessageCtx';
import Loading from '../../components/Loading';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Home = () => {
  const [showSide, setShowSide] = useState(true);

  const { isMessage } = useContext(ConfirmationMessageContext);

  const query = useQuery();

  const page = query.get('page') || 1;

  const { getPosts } = usePosts(page);
  useEffect(() => {
    getPosts.perform();
  }, [page, isMessage]);

  return (
    <>
      <ToolBar />

      <Grow in>
        <Container maxWidth="xl" className={classes.main}>
          <Loading />
          <div className={classes.display}>
            <SideBar />
          </div>
          <div className={classes.userSideBar}>
            {!showSide && (
              <div className={classes.showSideBar}>
                <SideBar />
              </div>
            )}
            <div
              className={showSide ? classes.sideArrow : classes.active}
              onClick={() => {
                setShowSide(!showSide);
              }}
            >
              {showSide ? (
                <IoIosArrowForward size="large" color="black" />
              ) : (
                <IoChevronBackSharp size="large" color="gray" />
              )}
            </div>
          </div>

          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.container}
          >
            <Grid item={true} xs={12} sm={6} md={12} className={classes.cards}>
              <div className={classes.action}>
                <Typography variant="h6">Actions</Typography>
                <Divider />
                <AddItem />
              </div>
              <Divider />
              <div className={classes.cardContainer}>
                <div className={classes.cardSectionHeader}>
                  <Typography variant="h6">Posts</Typography>
                  <Paginate />
                </div>
                <Divider />
                {isMessage && <ConfirmationMessage />}
                <Posts />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
