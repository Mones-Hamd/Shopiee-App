import { Button, CardMedia, TextField, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import classes from './Styles.module.css';
import React from 'react';
import FileBase from 'react-file-base64';

import useFrom from '../../../../hooks/useForm';

import { useMessage } from '../../../../hooks/useMessage';
const Edit = ({ post }) => {
  const { setIsUpdate, setIsMessage, setPostMemo } = useMessage();

  const user = JSON.parse(localStorage.getItem('profile'));
  const submit = async (e) => {
    setIsMessage(true);
    setIsUpdate(true);

    setPostMemo({ ...postData, name: user?.result?.name });
  };
  const [postData, handleChange, handleSubmit, setState] = useFrom(
    submit,
    post,
  );

  const clear = () => {
    handleChange();
    setIsUpdate(false);
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

          <Button size="small" color="primary" type="submit">
            <CheckIcon fontSize="large" />
            Edit
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Edit;
