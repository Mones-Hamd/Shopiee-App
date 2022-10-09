import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Avatar, Typography, Button } from '@mui/material';
import classes from './Styles.module.css';
import logo from '../../imgs/logo.png';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router';
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const logout = () => {
    localStorage.clear();
    navigate('/auth');
    setUser(null);
  };
  useEffect(() => {
    (async () => {
      const token = await user?.token;
      if (token) {
        const decodedToken = await decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    })();
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.logo}>
        <Link to="/">
          <img className={classes.image} src={logo} alt="logo" />
        </Link>
      </div>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>

            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
