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
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './Styles.module.css';
import EditPost from './EditPost/EditPost';
import { FetchContext } from '../../../context/fetchCtx';
import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';
import Favorite from './Favourite';
import { Link } from 'react-router-dom';

const Post = ({ post, setRender }) => {
  const { FetchPosts } = useContext(FetchContext);
  const [isEdit, setIsEdit] = useState();
  useEffect(() => {
    setIsEdit(false);
  }, []);
  const user = JSON.parse(localStorage.getItem('profile'));
  const deletePost = async (e) => {
    e.preventDefault();
    await FetchPosts(
      `http://localhost:5000/api/posts/${post._id}`,
      null,
      'DELETE',
    );
    setRender((prev) => !prev);
  };
  const favouritPost = async (e) => {
    e.preventDefault();
    await FetchPosts(
      `http://localhost:5000/api/posts/${post._id}/likes`,
      null,
      'PUT',
    );
    setRender((prev) => !prev);
  };

  return isEdit ? (
    <>
      <EditPost setIsEdit={setIsEdit} post={post} setRender={setRender} />
    </>
  ) : (
    <Card className={classes.card}>
      <Link to={`/items/${post._id}`} className={classes.link}>
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
      </Link>
      {(user?.result?._id || user?.result?.sub) === post.creator && (
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
      )}
      <Link to={`/items/${post._id}`} className={classes.link}>
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
            <Typography variant="body2" color="textSecondary">
              {post.description}
            </Typography>
            <Typography variant="overline">Price: {post.price} €</Typography>
            <Typography variant="subtitle2" gutterBottom>
              Reach me :{post.contact}
            </Typography>
          </CardContent>
        </div>
      </Link>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={favouritPost}
        >
          {!user?.result ? (
            <PersonOffRoundedIcon fontSize="small" />
          ) : (
            <Favorite post={post} />
          )}
        </Button>
        {(user?.result?._id || user?.result?.sub) === post?.creator && (
          <Button size="small" color="primary" onClick={deletePost}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
