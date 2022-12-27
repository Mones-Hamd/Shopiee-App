import React, { useContext, useEffect } from "react";
import Box from "@mui/joy/Box";
import { Typography, Grid } from "@mui/material";
import classes from "../Styles.module.css";
import { RecommendedPostsContext } from "../../../../context/RecommendedCtx";
import { useRecommended } from "../../../../hooks/useRecommended";
import Post from "../../Post/Post";
const Recommended = ({ post }) => {
  const { recommendedPosts } = useContext(RecommendedPostsContext);
  const { getRecommendedPosts } = useRecommended(post);
  useEffect(() => {
    if (post) {
      getRecommendedPosts.perform();
    }
  }, [post]);

  const postsToShow = recommendedPosts?.filter(({ _id }) => post?._id !== _id);
  return (
    postsToShow.length && (
      <>
        <Typography variant="h5" gutterBottom>
          You might Also Like
        </Typography>
        <div className={classes.recommendedContainer}>
          <Box
            sx={{
              display: "flex",
              height: "90%",
              overflowX: "auto",
              py: 1,
              maxWidth: "100%",
              scrollSnapType: "x mandatory",
              "& > *": { scrollSnapAlign: "center" },
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Grid
              className={classes.mainContainer}
              container
              alignitem="stretch"
              spacing={1}
            >
              {postsToShow.map((post) => (
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
          </Box>
        </div>
      </>
    )
  );
};

export default Recommended;
