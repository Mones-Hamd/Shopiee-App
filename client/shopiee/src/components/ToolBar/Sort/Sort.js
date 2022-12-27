import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import classes from './Styles.module.css';
const Sort = () => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={classes.sortBar}>
      <FormControl className={classes.selector} fullWidth>
        <InputLabel id="demo-simple-select-label" size="small">
          Sort
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Sort"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value={10}>Price low to high</MenuItem>
          <MenuItem value={20}>Price high to low</MenuItem>
          <MenuItem value={30}>Date</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
