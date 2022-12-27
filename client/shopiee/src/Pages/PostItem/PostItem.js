import React from "react";
import classes from "./Styles.module.css";
import Form from "../../components/Form/Form";

const PostItem = () => {
  return (
    <div className={classes.postFormContainer}>
      <Form />
    </div>
  );
};

export default PostItem;
