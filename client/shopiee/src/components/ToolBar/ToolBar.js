import React from "react";
import Search from "./Searchbar/Search";
import Sort from "./Sort/Sort";
import classes from "./Styles.module.css";
const ToolBar = () => {
  return (
    <div className={classes.appBar}>
      <Sort />
      <Search />
    </div>
  );
};

export default ToolBar;
