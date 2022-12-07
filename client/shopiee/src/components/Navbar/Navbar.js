import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import classes from './Styles.module.css';
import logo from '../../imgs/logo.png';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router';
import { AiOutlineUser, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const logout = async () => {
    setUser(null);
    localStorage.clear();
    navigate('/auth');
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
    <div className={classes.appBar}>
      <div className={classes.toolbar1}>
        <Typography variant="h6">
          <Link to="/" className={classes.link}>
            {' '}
            Home
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/contact" className={classes.link}>
            {' '}
            Contact
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/support" className={classes.link}>
            {' '}
            Support
          </Link>
        </Typography>
        {user && (
          <Typography variant="h6">
            <Link to="/post" className={classes.link}>
              {' '}
              Post Item
            </Link>
          </Typography>
        )}
      </div>
      <div className={classes.logo}>
        <Link to="/">
          <img className={classes.image} src={logo} alt="logo" />
        </Link>
      </div>

      <div className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <div className={classes.userInfo}>
              <Link to="/profile">
                <Avatar
                  className={classes.purple}
                  alt={user?.result?.name}
                  src={user?.result?.picture}
                >
                  {user?.result?.name.charAt(0)}
                </Avatar>
              </Link>
              <Link to="/profile">
                <AiOutlineUser color="black" className={classes.icons} />
                <Typography className={classes.userName} color="black">
                  {user?.result?.name}
                </Typography>
              </Link>
            </div>
            <Link to="/auth" className={classes.link} onClick={logout}>
              <AiOutlineLogout className={classes.icons} color="blue" />
              logout
            </Link>
          </div>
        ) : (
          <Link className={classes.signIn} to="/auth">
            <AiOutlineLogin className={classes.icons} color="blue" />
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
