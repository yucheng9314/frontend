import { makeStyles } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
}));

const Market = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <h1>This is Market Page!</h1>
    </div>
  );
};

export default Market;
