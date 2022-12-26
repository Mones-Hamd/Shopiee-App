import React, { useContext, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { TextField, Button } from '@mui/material';
import classes from './Styles.module.css';
import { PostsContext } from '../../../context/PostsCtx';
import { useNavigate } from 'react-router';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSearch } from '../../../hooks/useSearch';
const Search = () => {
  const navigate = useNavigate();
  const { search, setTags, setSearchTitle, tags, searchTitle } = useSearch();
  const searchPosts = async () => {
    if (searchTitle.trim() || tags) {
      search.perform();
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
      <Stack direction="row" spacing={0} className={classes.chip}>
        {tags?.map(
          (tag, indx) =>
            indx < 3 && (
              <Chip label={tag} onDelete={() => handleOnDelete(tag)} />
            ),
        )}
      </Stack>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.searchTitle}
          size="small"
          name="search"
          variant="outlined"
          label="Search By Title"
          value={searchTitle}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <TextField
          className={classes.searchTitle}
          name="search"
          size="small"
          variant="outlined"
          label="Search By Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(/[" ",]/))}
        />
      </div>

      <Button
        className={classes.searchBtn}
        onClick={searchPosts}
        variant="contained"
        size="medium"
      >
        <AiOutlineSearch color="white" />
        Search
      </Button>
    </div>
  );
};

export default Search;
