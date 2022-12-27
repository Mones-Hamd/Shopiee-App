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
import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';
import Favorite from './Favourite';
import { Link } from 'react-router-dom';
import { useMessage } from '../../../hooks/useMessage';
import { ConfirmationMessageContext } from '../../../context/ConMessageCtx';

const Post = ({ post }) => {
  const { setIsMessage, setIsUpdate, setIsDelete } = useMessage();
  const { setId, isUpdate } = useContext(ConfirmationMessageContext);
  const [isEdit, setIsEdit] = useState();

  useEffect(() => {
    setIsDelete(false);
    setIsUpdate(false);
    setIsEdit(false);
  }, []);

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id || user?.result?.sub;
  return isEdit && isUpdate ? (
    <>
      <EditPost
        post={post}
        setIsUpdate={setIsUpdate}
        setIsMessage={setIsMessage}
        setIsEdit={setIsEdit}
      />
    </>
  ) : (
    <Card className={classes.card}>
      <div className={classes.cardInner}>
        <div className={classes.cardFront}>
          <Link to={`/items/${post._id}`} className={classes.link}>
            <CardMedia
              image={post.selectedFile}
              title={post.title}
              className={classes.media}
            />
            <div className={classes.overlay}>
              <Typography>{post.name}</Typography>
              <Typography variant="body2">
                {moment(post.createdAt).fromNow()}
              </Typography>
            </div>
          </Link>
          <Link to={`/items/${post._id}`} className={classes.link}>
            <div className={classes.title}>
              <CardContent className={classes.editFeild}>
                <Typography gutterBottom>{post.title}</Typography>
                <Typography variant="overline"> {post.price} €</Typography>
              </CardContent>
            </div>
          </Link>
        </div>
        <div className={classes.cardBack}>
          <div className={classes.tags}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          {userId === post.creator && (
            <div className={classes.overlay2}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEdit(true);
                  setIsUpdate(true);
                  setId(post._id);
                }}
                size="large"
              >
                <EditIcon className={classes.editBtn} />
              </Button>
            </div>
          )}
          <div className={classes.description}>
            <Typography color="textSecondary" fontSize={10}>
              {post.description}
            </Typography>
          </div>
          <CardActions className={classes.cardActions}>
            {!user?.result ? (
              <PersonOffRoundedIcon fontSize="small" />
            ) : (
              <Favorite post={post} />
            )}
            {userId === post?.creator && (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  setIsMessage(true);
                  setIsDelete(true);
                  setId(post._id);
                }}
              >
                <DeleteIcon fontSize="small" />
                Delete
              </Button>
            )}
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default Post;
