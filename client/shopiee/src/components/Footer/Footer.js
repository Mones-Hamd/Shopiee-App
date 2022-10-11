import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import classes from './Styles.module.css';
const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Container maxWidth="lg" className={classes.footerContainer}>
          <Grid item={true} xs={12} sm={6} md={9} className={classes.side}>
            <Box borderBottom={1}>Developed By Mones Hamd</Box>
            <Box>
              <Link to={'/'}>
                <h5>Help</h5>
              </Link>
            </Box>
            <Box>
              <Link to={'/'}>
                <h5>Contact</h5>
              </Link>
            </Box>
            <Box>
              <Link to={'/'}>
                <h5>Support</h5>
              </Link>
            </Box>
          </Grid>
          <Grid item={true} xs={12} sm={6} md={9} className={classes.side}>
            <Box borderBottom={1}>Reach me on </Box>
            <Box>
              <Link to={'https://www.linkedin.com/in/mones-hamd-313ba722b/'}>
                <LinkedInIcon /> <h5>LinkedIn </h5>
              </Link>
            </Box>
            <Box>
              <Link to={'https://github.com/Mones-Hamd'}>
                <GitHubIcon /> <h5>GitHub </h5>
              </Link>
            </Box>
            <Box>
              <Link to={'https://www.facebook.com/mones.azam/'}>
                <FacebookIcon /> <h5>Facebook </h5>
              </Link>
            </Box>
          </Grid>
        </Container>
        <Box textAlign="center" className={classes.right}>
          React Project by Mones &reg; {new Date().getFullYear()}
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
