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

const Form = ({ post, setIsEdit }) => {
  const { err, isLoading, FetchPosts } = useContext(FetchContext);

  const [postData, setPostData] = useState(post);

  const HandleSubmit = (e) => {
    e.preventDefault();
    FetchPosts(`http://localhost:5000/api/posts/${post._id}`, postData, 'put');

    clear();
  };
  const clear = () => {
    setIsEdit(true);
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={HandleSubmit}
        className={classes.form}
      >
        <CardMedia
          image={postData.selectedFile}
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
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="description"
            id="outlined-multiline-static"
            label="Edit item Description"
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
            label="Edit item Price"
            fullWidth
            value={postData.price}
            onChange={(e) =>
              setPostData({ ...postData, price: e.target.value })
            }
          />
          <TextField
            name="contact"
            variant="outlined"
            label="Edit your Contact"
            fullWidth
            value={postData.contact}
            onChange={(e) =>
              setPostData({ ...postData, contact: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Edit item Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          />
        </div>
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

export default Form;
