import React from 'react';
import { Typography, Button, TextField, CircularProgress } from '@mui/material';
import classes from './Styles.module.css';

import SendIcon from '@mui/icons-material/Send';
import { useComment } from '../../../../hooks/useComment';
const Comments = ({ post }) => {
  const { setUserComment, getComment, getComments, commentsRef } =
    useComment(post);
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleComment = async (e) => {
    const userComment = `${user.result.name}: ${getComment.comment}`;
    setUserComment.perform(userComment);
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {getComments.comments?.map((comm, indx) => (
          <Typography key={indx} gutterBottom variant="subtitle1">
            <strong>{comm.split(': ')[0]}</strong>
            {comm.split(':')[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>
      {user?.result?.name && (
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">
            Leave a comment and FeedBack
          </Typography>

          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={getComment.comment}
            onChange={(e) => getComment.setComment(e.target.value)}
          />
          {setUserComment.isLoading && <CircularProgress />}
          <br />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!getComment.comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            comment &nbsp; &nbsp;
            <SendIcon />
          </Button>
          {setUserComment.isError && (
            <Typography variant="h6">something went wrong</Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
