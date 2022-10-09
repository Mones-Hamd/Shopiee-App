import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './Styles.module.css';
import EditPost from './EditPost/EditPost';
import { FetchContext } from '../../../context/fetchCtx';
import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';
const Post = ({ post }) => {
  const { FetchPosts } = useContext(FetchContext);
  const [isEdit, setIsEdit] = useState();
  useEffect(() => {
    setIsEdit(false);
  }, []);
  const user = JSON.parse(localStorage.getItem('profile'));
  const deletePost = (e) => {
    e.preventDefault();
    FetchPosts(`http://localhost:5000/api/posts/${post._id}`, null, 'DELETE');
  };

  return isEdit ? (
    <>
      <EditPost setIsEdit={setIsEdit} post={post} />
    </>
  ) : (
    <Card className={classes.card}>
      <CardMedia
        image={post.selectedFile}
        title={post.title}
        className={classes.media}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user?.result?._id === post.creator ||
        (user?.result?.sub === post?.creator && (
          <div className={classes.overlay2}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(true);
              }}
              size="large"
            >
              <EditIcon className={classes.editBtn} />
            </Button>
          </div>
        ))}
      <div className={classes.detail}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <div className={classes.title}>
        <CardContent className={classes.editFeild}>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
          <Typography variant="overline">Price: {post.price} €</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Reach me :{post.contact}
          </Typography>
        </CardContent>
      </div>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => {}}
        >
          {!user?.result ? (
            <PersonOffRoundedIcon fontSize="small" />
          ) : (
            <FavoriteIcon fontSize="small" />
          )}
          Like
        </Button>
        {user?.result?._id === post.creator ||
          (user?.result?.sub === post?.creator && (
            <Button size="small" color="primary" onClick={deletePost}>
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          ))}
      </CardActions>
    </Card>
  );
};

export default Post;
