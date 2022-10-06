import React from 'react';
import { AppBar } from '@mui/material';
import classes from './Styles.module.css';
import logo from '../../imgs/logo.png';
const Navbar = () => {
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.logo}>
        <img className={classes.image} src={logo} alt="logo" height="60" />
      </div>
    </AppBar>
  );
};

export default Navbar;
