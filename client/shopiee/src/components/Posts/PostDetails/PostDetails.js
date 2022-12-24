import React, { useContext, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import classes from './Styles.module.css';
import { Link, useParams } from 'react-router-dom';
import { PostsContext } from '../../../context/PostsCtx';
import { RecommendedPostsContext } from '../../../context/RecommendedCtx';
import moment from 'moment';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comments from './Comments/Comments';
import { usePosts } from '../../../hooks/usePosts';
import { useRecommended } from '../../../hooks/useRecommended';
const PostDetails = () => {
  const { id } = useParams();
  const { getPost } = usePosts(null, id);

  const { recommendedPosts } = useContext(RecommendedPostsContext);
  useEffect(() => {
    getPost.perform();
  }, [id]);
  const { post } = useContext(PostsContext);
  const { getRecommendedPosts } = useRecommended(post);
  useEffect(() => {
    if (post) {
      getRecommendedPosts.perform();
    }
  }, [post]);

  const postsToShow = recommendedPosts?.filter(({ _id }) => post?._id !== _id);

  if (getPost.isLoading) {
    return (
      <Paper elevation={6} className={classes.loading}>
        <CircularProgress size="6em" />
      </Paper>
    );
  }
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.description}
          </Typography>
          <Typography variant="h6">Posted By: {post.name}</Typography>

          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Typography variant="overline">Price: {post.price} €</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Reach me :{post.contact}
          </Typography>
          <div className={classes.actions}>
            <FavoriteIcon fontSize="small" />
            &nbsp; {post?.likes?.length}
          </div>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Comments post={post} />

          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      {postsToShow.length && (
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
              ({
                title,
                selectedFile,
                price,
                description,
                name,
                likes,
                _id,
              }) => (
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
                    <Box
                      sx={{ whiteSpace: 'nowrap' }}
                      className={classes.Rtitle}
                    >
                      <Typography fontWeight="md">
                        {' '}
                        Posted by: {name}
                      </Typography>
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
      )}
    </Paper>
  );
};

export default PostDetails;
