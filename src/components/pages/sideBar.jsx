import Divider from "@material-ui/core/Divider";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import HomeIcon from "@material-ui/icons/Home";
import StorefrontIcon from "@material-ui/icons/Storefront";
import GamesIcon from "@material-ui/icons/Games";
import { Tooltip } from "@material-ui/core";
import { SvgIcon } from "@material-ui/core";
import "./sideBar.css";

const sideItems = [
  {
    id: 1,
    name: "首页",
    smallName: "首页",
    icon: <HomeIcon />,
    url: "/home",
  },
  {
    id: 2,
    name: "广场",
    smallName: "广场",
    icon: <StorefrontIcon />,
    url: "/market",
  },
  {
    id: 3,
    name: "我的群组",
    smallName: "群组",
    icon: <SupervisedUserCircleIcon />,
    url: "/group",
  },
];

const SideBar = ({ siderBarState }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <div style={{ minHeight: 62 }} />
      <div
        className={
          siderBarState ? "sideBarRoot " : " sideBarRoot sideBarRoot-hidden"
        }
      >
        <div
          className={
            siderBarState ? "sideBarArea" : "sideBarArea sideBarArea-hidden"
          }
        >
          {sideItems.map((item) => (
            <Link className="link" key={item.id} to={item.url}>
              <div
                onClick={() => handleListItemClick(item.id)}
                className={
                  selectedIndex === item.id
                    ? "sideBarItem  sideBarItem-bc"
                    : "sideBarItem"
                }
              >
                <Tooltip
                  title={item.name}
                  disableHoverListener={siderBarState ? true : false}
                  arrow
                  placement="right"
                >
                  <div
                    className={
                      siderBarState
                        ? "sideBarItemDisplay"
                        : "sideBarItemDisplay sideBarItemDisplay-hidden"
                    }
                  >
                    <SvgIcon
                      className={
                        selectedIndex !== item.id
                          ? "sideBarItemIcon "
                          : "sideBarItemIcon sideBarItemIcon-selected"
                      }
                    >
                      {item.icon}
                    </SvgIcon>
                    <span
                      key={item.id}
                      className={`sideBarItemName 
                         ${siderBarState ? "" : "sideBarItemName-hidden"}
                         ${
                           selectedIndex !== item.id
                             ? ""
                             : "sideBarItemName-selected"
                         }
                         `}
                    >
                      {item.name}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </Link>
          ))}
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
