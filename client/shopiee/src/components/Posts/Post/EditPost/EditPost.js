import {
  Button,
  CardMedia,
  Typography,
  TextField,
  Paper,
  CircularProgress,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import classes from './Styles.module.css';
import React, { useContext, useState } from 'react';
import FileBase from 'react-file-base64';
import { FetchContext } from '../../../../context/fetchCtx';
import useFrom from '../../../../hooks/useForm';

const Edit = ({ post, setIsEdit, setRender }) => {
  const { err, isLoading, FetchPosts } = useContext(FetchContext);

  const user = JSON.parse(localStorage.getItem('profile'));
  const submit = (e) => {
    FetchPosts(
      `http://localhost:5000/api/posts/${post._id}`,
      { ...postData, name: user?.result?.name },
      'put',
    );
    setRender((prev) => !prev);
    clear();
  };
  const [postData, handleChange, handleSubmit, setState] = useFrom(
    submit,
    post,
  );

  const clear = () => {
    setIsEdit(false);
    handleChange();
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <CardMedia
          image={post.selectedFile}
          title={postData.title}
          className={classes.media}
        />
        <div className={classes.editFeild}>
          <TextField
            name="title"
            variant="outlined"
            label="Edit item Title"
            fullWidth
            value={postData.title}
            onChange={handleChange}
          />
          <TextField
            name="description"
            id="outlined-multiline-static"
            label="Edit item Description"
            multiline
            rows={4}
            fullWidth
            value={postData.description}
            onChange={handleChange}
          />
          <TextField
            name="price"
            variant="outlined"
            label="Edit item Price"
            type="number"
            fullWidth
            value={postData.price}
            onChange={handleChange}
          />
          <TextField
            name="contact"
            variant="outlined"
            label="Edit your Contact"
            fullWidth
            value={postData.contact}
            onChange={handleChange}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Edit item Tags"
            fullWidth
            value={postData.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <FileBase
            name="selectedFile"
            type="file"
            multiple={false}
            className={classes.fileInput}
            onDone={({ base64 }) =>
              setState({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <div className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={(e) => {
              clear();
            }}
          >
            <ClearIcon fontSize="larger" />
            Cancel
          </Button>
          {isLoading && <CircularProgress />}
          <Button size="small" color="primary" type="submit">
            <CheckIcon fontSize="large" />
            Edit
          </Button>
          {err.length > 1 && <Typography>{err}</Typography>}
        </div>
      </form>
    </Paper>
  );
};

export default Edit;
