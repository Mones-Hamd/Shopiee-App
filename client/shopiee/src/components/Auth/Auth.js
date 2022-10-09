import React, { useContext, useState } from 'react';
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import classes from './Styles.module.css';
import { AuthContext } from '../../context/Auth';
import { useNavigate } from 'react-router';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const Auth = () => {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();
  const { sign, err, isLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const onSuccess = async (credentialResponse) => {
    const decodedToken = await jwtDecode(credentialResponse.credential);

    localStorage.setItem(
      'profile',
      JSON.stringify({
        result: decodedToken,
        token: credentialResponse.credential,
      }),
    );
    navigate('/');
  };
  const onError = () => {
    setIsAuth(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await sign('http://localhost:5000/user/signup', formData);
      const user = await JSON.parse(localStorage.getItem('profile')).token;
      if (user) {
        navigate('/');
      } else {
        setIsAuth(false);
      }
    } else {
      await sign('http://localhost:5000/user/signin', formData);
      const user = await JSON.parse(localStorage.getItem('profile')).token;
      if (user) {
        navigate('/');
      } else {
        setIsAuth(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="secondary" />
        </Avatar>
        {isLoading && <CircularProgress />}
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Adress"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type={showPassword ? 'text' : 'password'}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
          {err && <Typography variant="h6">{err}</Typography>}
          {!isAuth && (
            <Grid className={classes.notAuth}>
              <Typography variant="body2">Wrong Password or Email</Typography>
              <Link to={'/'}>
                <HomeRoundedIcon />
              </Link>
            </Grid>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
