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
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './Styles.module.css';
import EditPost from './EditPost/EditPost';

const Post = ({ post }) => {
  const [isEdit, setIsEdit] = useState();
  useEffect(() => {
    setIsEdit(true);
  }, []);

  return !isEdit ? (
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
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsEdit(false);
          }}
          size="large"
        >
          <EditIcon className={classes.editBtn} />
        </Button>
      </div>
      <div className={classes.detail}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <div className={classes.title}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {post.description}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {post.price} €
          </Typography>
          <Typography variant="h5" gutterBottom>
            Reach me :{post.contact}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <FavoriteIcon fontSize="small" />
          Like
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
