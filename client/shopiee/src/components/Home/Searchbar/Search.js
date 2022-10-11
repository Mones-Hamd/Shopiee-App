import React, { useContext, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AppBar, TextField, Button } from '@mui/material';
import classes from './Styles.module.css';
import { PostsContext } from '../../../context/PostsCtx';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

const Search = () => {
  const navigate = useNavigate();
  const { getPosts } = useContext(PostsContext);
  const [tags, setTags] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  const searchPosts = async () => {
    if (searchTitle.trim() || tags) {
      const url = `http://localhost:5000/api/search?searchQuery=${
        searchTitle || 'none'
      }&tags=${tags.join(',')}`;
      await getPosts(url);
      navigate(
        `/items/search?search=${searchTitle || 'none'}&tag=${tags.join(',')}`,
      );
    } else {
      navigate('/');
    }
  };
  const handleOnDelete = (tagOnDelete) =>
    setTags(tags.filter((tag) => tag !== tagOnDelete));
  const handleKeyPress = (e) => {};
  return (
    <div className={classes.searchBar}>
      <div>
        <TextField
          className={classes.searchTitle}
          name="search"
          variant="outlined"
          label="search By title"
          value={searchTitle}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <TextField
          className={classes.searchTitle}
          name="search"
          variant="outlined"
          label="search By Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(/[" ",]/))}
        />
      </div>
      <Stack direction="row" spacing={0}>
        {tags?.map((tag) => (
          <Chip label={tag} onDelete={() => handleOnDelete(tag)} />
        ))}
      </Stack>
      <Button
        className={classes.searchBtn}
        onClick={searchPosts}
        color="primary"
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
