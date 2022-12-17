import React from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CgProfile } from 'react-icons/cg';
import { TiMessages } from 'react-icons/ti';
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineFieldTime,
} from 'react-icons/ai';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { GiPostStamp } from 'react-icons/gi';

import classes from './Styles.module.css';

const SideBar = () => {
  return (
    <Box
      width={170}
      className={classes.sideBox}
      display="block"
      component="div"
    >
      <Box>
        <Typography variant="h6">User Info</Typography>
      </Box>
      <Divider />
      <List className={classes.userInfo}>
        <ListItem key={1} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CgProfile />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={2} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TiMessages />
            </ListItemIcon>
            <ListItemText primary={'Messages'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={3} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AiOutlineSetting />
            </ListItemIcon>
            <ListItemText primary={'Setting'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box>
        <Typography variant="h6">User Items</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem key={4} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GiPostStamp />
            </ListItemIcon>
            <ListItemText primary={'Your Items'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={5} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FaHandHoldingUsd />
            </ListItemIcon>
            <ListItemText primary={'Your Offers'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={6} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AiOutlineHeart />
            </ListItemIcon>
            <ListItemText primary={'Favourite Items'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={7} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AiOutlineFieldTime />
            </ListItemIcon>
            <ListItemText primary={'Recently Items'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
