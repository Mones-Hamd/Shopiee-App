import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import classes from "./Styles.module.css";
import { useNavigate } from "react-router";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import useFrom from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthCtx";

const AuthForm = () => {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { setProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const onSuccess = async (credentialResponse) => {
    const decodedToken = await jwtDecode(credentialResponse.credential);
    setProfile({
      result: decodedToken,
      token: credentialResponse.credential,
    });
    localStorage.setItem(
      "profile",
      JSON.stringify({
        result: decodedToken,
        token: credentialResponse.credential,
      })
    );
    navigate("/");
  };
  const onError = () => {
    setIsAuth(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      signUp.perform(formData);
    } else {
      await signIn.perform(formData);
    }
  };
  useEffect(() => {
    if (signIn.error || signUp.error) {
      setIsAuth(false);
    }
    if (signIn.isSuccess || signUp.isSuccess) {
      setIsAuth(true);
      navigate("/");
    }
  }, [
    signIn.error,
    signIn.isSuccess,
    navigate,
    signUp.error,
    signUp.isSuccess,
  ]);
  const [formData, handleChange] = useFrom();

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

        {(signIn.isLoading || signUp.isLoading) && <CircularProgress />}
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
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
              type={showPassword ? "text" : "password"}
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
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>

          {!isAuth && (
            <Grid className={classes.notAuth}>
              <Typography variant="body2">Wrong Password or Email</Typography>
              <Link to={"/"}>
                <HomeRoundedIcon />
              </Link>
            </Grid>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;
