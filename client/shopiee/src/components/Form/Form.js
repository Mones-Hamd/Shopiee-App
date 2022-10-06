import React from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import classes from './Styles.module.css';

import FileBase from 'react-file-base64';
const Form = () => {
  const handleSubmit = () => {};
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <Typography variant="h6">Post My Item </Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth />
        <TextField
          name="description"
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          fullWidth
        />
        <TextField name="price" variant="outlined" label="Price" fullWidth />
        <TextField
          name="contact"
          variant="outlined"
          label="Contact"
          fullWidth
        />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth />
        <div>
          <FileBase
            type="file"
            multiple={false}
            className={classes.fileInput}
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
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
