import React, { useContext, useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import classes from './Styles.module.css';
import FileBase from 'react-file-base64';

import { FetchContext } from '../../context/fetchCtx';
const Form = () => {
  const { err, isLoading, FetchPosts } = useContext(FetchContext);

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    price: 0,
    contact: '',
    tags: [],
    selectedFile: '',
  });
  const user = JSON.parse(localStorage.getItem('profile'));
  const HandleSubmit = (e) => {
    e.preventDefault();
    FetchPosts(
      `http://localhost:5000/api/posts`,
      { ...postData, name: user?.result?.name },
      'post',
    );
    clear();
  };

  const clear = () => {
    setPostData({
      title: '',
      description: '',
      price: 0,
      contact: '',
      tags: [],
      selectedFile: '',
    });
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to sell and post your items
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={HandleSubmit}
        className={classes.form}
      >
        <Typography variant="h6">
          Post My Item {isLoading && <CircularProgress />}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="description"
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          fullWidth
          value={postData.price}
          onChange={(e) => setPostData({ ...postData, price: e.target.value })}
        />
        <TextField
          name="contact"
          variant="outlined"
          label="Contact"
          fullWidth
          value={postData.contact}
          onChange={(e) =>
            setPostData({ ...postData, contact: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div>
          <FileBase
            name="selectedFile"
            type="file"
            multiple={false}
            className={classes.fileInput}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          type="submit"
          endIcon={<SendIcon />}
          className={classes.buttonSubmit}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          fullWidth
          startIcon={<DeleteIcon />}
          className={classes.buttonClear}
          onClick={clear}
        >
          Clear
        </Button>
        {err.length > 1 && <Typography>{err}</Typography>}
      </form>
    </Paper>
  );
};

export default Form;
