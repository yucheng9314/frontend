import React from "react";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";

import "./userSetting.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  toolbar: theme.mixins.toolbar,
  sidebar: {
    margin: theme.spacing(4),
  },
}));

const UserSetting = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.sidebar}></div>
    </div>
  );
};

export default UserSetting;
