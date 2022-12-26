import React, { useContext, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Typography, Divider } from '@mui/material';
import classes from '../Styles.module.css';
import { RecommendedPostsContext } from '../../../../context/RecommendedCtx';
import { useRecommended } from '../../../../hooks/useRecommended';
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
      <Divider>
        <Typography variant="h5" gutterBottom>
          You might Also Like
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            py: 1,
            overflow: 'auto',
            width: 900,
            scrollSnapType: 'x mandatory',
            '& > *': {
              scrollSnapAlign: 'center',
            },
            '::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {postsToShow.map(
            ({ title, selectedFile, price, description, name, likes, _id }) => (
              <Card
                row
                key={title}
                variant="outlined"
                className={classes.recommendedCard}
              >
                <Link to={`/items/${_id}`} className={classes.link}>
                  <AspectRatio
                    ratio="1"
                    sx={{
                      minWidth: 300,
                      borderRadius: 'sm',
                      overflow: 'auto',
                    }}
                    className={classes.recommendedMedia}
                  >
                    <img src={selectedFile} alt={title} />
                  </AspectRatio>
                  <Box sx={{ whiteSpace: 'nowrap' }} className={classes.Rtitle}>
                    <Typography fontWeight="md"> Posted by: {name}</Typography>
                    <Typography fontWeight="md">{title}</Typography>
                    <Typography level="body2">{description}</Typography>
                    <Typography level="body2">Price: {price} € </Typography>
                    <div className={classes.actions}>
                      <FavoriteIcon fontSize="small" />
                      &nbsp; {likes.length}
                    </div>
                  </Box>
                </Link>
              </Card>
            ),
          )}
        </Box>
      </Divider>
    )
  );
};

export default Recommended;
