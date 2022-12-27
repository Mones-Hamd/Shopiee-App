import React from 'react';
import { Card, CardMedia, Typography } from '@mui/material';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import classes from './Styles.module.css';
const AddItem = () => {
  return (
    <div className={classes.actionContainer}>
      <Card className={classes.card}>
        <CardMedia className={classes.media}>
          <Link to="/post">
            <BsPlusCircle size={50} className={classes.add} color="blue" />
          </Link>
        </CardMedia>
        <Typography
          gutterBottom
          component="div"
          textAlign="center"
          color="black"
        >
          Add New Item
        </Typography>
      </Card>
    </div>
  );
};

export default AddItem;
