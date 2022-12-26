import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
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
import useFrom from '../../hooks/useForm';
import { useCreate } from '../../hooks/useCreate';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNotifications } from '../../hooks/useNontifications';
import Notifications from '../Notifications/Notifications';

const Form = () => {
  const navigate = useNavigate();
  const { create } = useCreate();

  const user = JSON.parse(localStorage.getItem('profile'));
  const submit = async (e) => {
    create.perform({ ...postData, name: user?.result?.name });
  };
  if (create.isSuccess) navigate('/');
  const [postData, handleChange, handleSubmit, setState] = useFrom(submit, {});

  const clear = () => {
    handleChange();
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
    <Paper className={classes.paper} elevation={3}>
      {create.isError && <Notifications />}
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <Typography variant="h6">
          Post My Item {create.isLoading && <CircularProgress />}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title || ''}
          onChange={handleChange}
        />
        <TextField
          name="description"
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={postData.description || ''}
          onChange={handleChange}
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          type="number"
          fullWidth
          value={postData.price || ''}
          onChange={handleChange}
        />
        <TextField
          name="contact"
          variant="outlined"
          label="Contact"
          fullWidth
          value={postData.contact || ''}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags || ''}
          onChange={handleChange}
        />
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
      </form>
    </Paper>
  );
};

export default Form;
