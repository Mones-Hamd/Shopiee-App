import React, { useState, useRef, useContext } from 'react';
import { Typography, Button, TextField, CircularProgress } from '@mui/material';
import classes from './Styles.module.css';
import { FetchContext } from '../../../../context/fetchCtx';
import SendIcon from '@mui/icons-material/Send';
const Comments = ({ post }) => {
  const { err, isLoading, FetchPosts } = useContext(FetchContext);

  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments);
  const commentsRef = useRef();
  const handleComment = async (e) => {
    const userComment = `${user.result.name}: ${comment}`;
    const newComment = await FetchPosts(
      `http://localhost:5000/api/comments/${post._id}`,
      { userComment },
      'Put',
    );
    setComments(newComment);
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments?.map((comm, indx) => (
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {isLoading && <CircularProgress />}
          <br />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            comment &nbsp; &nbsp;
            <SendIcon />
          </Button>
          {err && <Typography variant="h6">{err}</Typography>}
        </div>
      )}
    </div>
  );
};

export default Comments;
