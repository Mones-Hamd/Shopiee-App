import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Typography, IconButton } from '@mui/material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import classes from './Styles.module.css';
import logo from '../../imgs/logo.png';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { useNavigate } from 'react-router';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineUser, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthCtx';
const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { profile, setProfile } = useContext(AuthContext);
  const logout = async () => {
    localStorage.clear();
    setProfile(null);
    navigate('/auth');
  };

  useEffect(() => {
    (async () => {
      const token = await profile?.token;
      if (token) {
        const decodedToken = await decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
    })();
  });

  return (
    <div className={classes.appBar}>
      <nav className={classes.hamburgerMenu}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setActive(!active)}
        >
          <MenuIcon />
        </IconButton>
      </nav>
      <Box
        width={170}
        className={classes.sideBoxNav}
        display={active ? 'block' : 'none'}
        component="div"
      >
        <div className={classes.boxHeader}>
          <BiArrowBack
            onClick={() => {
              setActive(!active);
            }}
            size="small"
          />
        </div>
        <Divider />
        <List className={classes.menu}>
          <ListItem key={1} disablePadding>
            <ListItemButton href="/" className={classes.link}>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={2} disablePadding>
            <ListItemButton href="/post" className={classes.link}>
              <ListItemText primary={'Post Item'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={3} disablePadding>
            <ListItemButton href="/contact" className={classes.link}>
              <ListItemText primary={'Contact'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={4} disablePadding>
            <ListItemButton href="/support" className={classes.link}>
              <ListItemText primary={'Support'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <div className={classes.toolbar1}>
        <Typography variant="h6">
          <Link to="/" className={classes.navLink}>
            {' '}
            Home
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/contact" className={classes.navLink}>
            {' '}
            Contact
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/support" className={classes.navLink}>
            {' '}
            Support
          </Link>
        </Typography>
        {profile && (
          <Typography variant="h6">
            <Link to="/post" className={classes.navLink}>
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
        {profile?.result ? (
          <div className={classes.profile}>
            <div className={classes.userInfo}>
              <Link to="/profile">
                <Avatar
                  className={classes.purple}
                  alt={profile?.result?.name}
                  src={profile?.result?.picture}
                >
                  {profile?.result?.name.charAt(0)}
                </Avatar>
              </Link>
              <Link to="/profile">
                <Typography className={classes.userName} color="black">
                  {profile?.result?.name}
                </Typography>
              </Link>
            </div>
            <Link to="/auth" className={classes.navLink} onClick={logout}>
              <div className={classes.profile}>
                <AiOutlineLogout className={classes.icons} color="blue" />
                <p>logout</p>
              </div>
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
