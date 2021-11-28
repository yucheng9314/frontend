import React from "react";
import { NavLink } from "react-router-dom";
import {
  Link,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  Tooltip,
} from "@material-ui/core";
import {
  Search,
  Menu as MenuIcon,
  Notifications,
  Mail as MailIcon,
  WbSunny,
} from "@material-ui/icons";

import { alpha, makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  appBar: {
    zIndex: 2,
  },

  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },

  partake: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    border: "1px solid #6D6D6D",
    opacity: 0.7,
    borderRadius: "4px",
  },

  searchInput: {
    width: "100%",
    opacity: "0.6",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },

  searchIcon: {
    marginLeft: theme.spacing(2),
  },

  inputInput: {
    marginLeft: theme.spacing(1),
  },
}));

const SearchBar = ({ user, handleSideBarHidden }) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink className="link" to="/usersetting">
        <MenuItem onClick={handleMenuClose}>账户设置</MenuItem>
      </NavLink>
      <NavLink className="link" to="/loginout">
        <MenuItem onClick={handleMenuClose}>退出登录</MenuItem>
      </NavLink>
    </Menu>
  );

  const renderUser = (
    <div>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={17} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>

      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar src="/avatars/Saesar.jpg" />
      </IconButton>
    </div>
  );

  const renderLoginButton = (
    <NavLink className="link" to="/login">
      <Button variant="contained" color="secondary">
        Login In
      </Button>
    </NavLink>
  );

  return (
    <AppBar elevation={0} color="inherit" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div style={{ display: "flex" }}>
          <Tooltip title="隐藏侧边栏" arrow placement="bottom">
            <IconButton
              onClick={handleSideBarHidden}
              edge="start"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <NavLink className="link zhaoling-logo" to="/home">
            <Avatar alt="Sharp" src="/logoTest01.png" />
            <Typography variant="h6" style={{ fontWeight: 550 }}>
              Partake
            </Typography>
          </NavLink>
        </div>

        <div className={classes.searchBox}>
          <InputBase
            className={classes.searchInput}
            startAdornment={<Search className={classes.searchIcon} />}
            placeholder="搜索…"
            classes={{ input: classes.inputInput }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        <div>
          {!user && renderLoginButton}
          {user && renderUser}
          {renderMenu}
        </div>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default SearchBar;
