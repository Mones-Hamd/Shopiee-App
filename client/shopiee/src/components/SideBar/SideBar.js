import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiPostStamp } from "react-icons/gi";

import classes from "./Styles.module.css";

const SideBar = () => {
  return (
    <Box width={90} className={classes.sideBox} display="block" component="div">
      <Divider />
      <List className={classes.userInfo}>
        <ListItem key={1} disablePadding>
          <ListItemButton>
            <CgProfile size={15} />
            <ListItemText
              primary={"Profile"}
              className={classes.listItemText}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={2} disablePadding>
          <ListItemButton>
            <TiMessages size={15} />
            <ListItemText
              primary={"Messages"}
              className={classes.listItemText}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={3} disablePadding>
          <ListItemButton>
            <AiOutlineSetting size={15} />

            <ListItemText
              primary={"Setting"}
              className={classes.listItemText}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={4} disablePadding>
          <ListItemButton>
            <GiPostStamp size={15} />
            <ListItemText primary={"Items"} className={classes.listItemText} />
          </ListItemButton>
        </ListItem>
        <ListItem key={5} disablePadding>
          <ListItemButton>
            <FaHandHoldingUsd size={15} />
            <ListItemText
              primary={" Offers"}
              className={classes.listItemText}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={6} disablePadding>
          <ListItemButton>
            <AiOutlineHeart size={20} />
            <ListItemText
              primary={"Favourite "}
              className={classes.listItemText}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={7} disablePadding>
          <ListItemButton>
            <AiOutlineFieldTime size={20} />
            <ListItemText
              primary={"Recently "}
              className={classes.listItemText}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
