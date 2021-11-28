import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: "#F3F3F3",
    border: "1px solid #6D6D6D",
    borderRadius: "4px",
  },
  toolbar: theme.mixins.toolbar,
}));

const UseComments = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.root}>
        <Typography variant="h5"> UseComments!</Typography>
      </div>
    </div>
  );
};

export default UseComments;
