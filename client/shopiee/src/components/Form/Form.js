import React, { useState } from 'react';
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
import { useCreate } from '../../hooks/Create';
const Form = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    price: 0,
    contact: '',
    tags: [],
    selectedFile: '',
  });
  const HandleSubmit = (e) => {
    e.preventDefault();
    const { err, isLoading } = useCreate(
      `http://localhost:5000/api/posts`,
      postData,
    );
    if (err) setError(err);
    setIsLoading(isLoading);
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
        {error.length > 1 && <Typography>{error}</Typography>}
      </form>
    </Paper>
  );
};

export default Form;
