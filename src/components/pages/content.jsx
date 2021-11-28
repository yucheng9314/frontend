import React from "react";
import { makeStyles } from "@material-ui/core";
import ThreeDEngine from "../3DEngine/3dengine";
import UseComments from "./useComments";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
}));

const Content = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThreeDEngine />
      <UseComments />
    </div>
  );
};

export default Content;
