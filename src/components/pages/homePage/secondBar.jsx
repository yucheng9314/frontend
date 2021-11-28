import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Button, Paper, Chip } from "@material-ui/core";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 64,
  },
  toolbar: theme.mixins.toolbar,
  bar: {
    display: "flex",
    position: "fixed",
    alignItems: "center",
    backgroundColor: "white",
    width: "100vw",
    minHeight: 54,
    zIndex: 1,
    "& > *": {
      margin: 8,
    },
  },
  line: {
    display: "flex",
    position: "fixed",
    width: "100%",
    marginTop: 54,
  },
}));

const SecondBar = () => {
  const [selectButtonIndex, setSelectButtonIndex] = useState(1);

  const handleChange = (index) => {
    setSelectButtonIndex(index);
  };

  const buttonList = [
    {
      id: 1,
      name: "全部",
      icon: <ViewComfyIcon />,
    },
    {
      id: 2,
      name: "3D模型",
    },
    {
      id: 3,
      name: "2D平面",
    },
    {
      id: 4,
      name: "图形渲染",
    },
    {
      id: 5,
      name: "动画",
    },
    {
      id: 6,
      name: "编程技术",
    },
    {
      id: 7,
      name: "CG艺术",
    },
    {
      id: 8,
      name: "UI设计",
    },
    {
      id: 9,
      name: "产品广告",
    },
    {
      id: 10,
      name: "摄影",
    },
    {
      id: 11,
      name: "其他",
    },
  ];

  const classes = useStyles();
  return (
    <div>
      <div className={classes.root} />
      <div className={classes.bar}>
        {buttonList.map((button) => (
          <Chip
            style={{ fontSize: 14 }}
            icon={button.icon}
            key={button.id}
            label={button.name}
            color={button.id === selectButtonIndex ? "secondary" : "default"}
            onClick={() => handleChange(button.id)}
          />
        ))}
      </div>
      <Divider className={classes.line} />
    </div>
  );
};

export default SecondBar;
