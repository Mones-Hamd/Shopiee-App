import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import classes from './Styles.module.css';
const AddItem = () => {
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media}>
        <Link to="/post">
          <BsPlusCircle size={125} className={classes.add} color="blue" />
        </Link>
      </CardMedia>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
          color="black"
        >
          Add New Item
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AddItem;
