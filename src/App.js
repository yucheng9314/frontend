import { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
import auth from "./services/authService";
import SearchBar from "./components/navbar/searchBar";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import LoginOut from "./components/authentication/loginOut";
import NotFound from "./components/pages/notFound";
import UserSetting from "./components/pages/users/userSetting";
import HomePage from "./components/pages/homePage/homePage";
import { ThemeProvider } from "@material-ui/core";
import SideBar from "./components/pages/sideBar";
import ShowContent from "./components/pages/showContentPage/showContent";
import Theme from "./components/theme";
import Market from "./components/pages/marketPage/market";
import TeamGroup from "./components/pages/teamGroupsPage/teamGroup";
import Content from "./components/pages/content";
import React from "react";

const App = () => {
  const [siderBarState, setSiderBarState] = useState(false);
  const [user, setUser] = useState("");

  let location = useLocation();
  let background = location.state && location.state.background;

  const handleSideBarHidden = () => {
    setSiderBarState(!siderBarState);
  };

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  if (
    location.pathname.match("/usersetting") ||
    location.pathname.match("/register") ||
    location.pathname.match("/login") ||
    location.pathname.match("/loginout")
  ) {
    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <SearchBar user={user} handleSideBarHidden={handleSideBarHidden} />
        <Switch>
          <Route path="/usersetting" component={UserSetting} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/loginout" component={LoginOut} />
        </Switch>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {background && (
        <Route path="/gallery/:id">
          <ShowContent />
        </Route>
      )}
      <SearchBar user={user} handleSideBarHidden={handleSideBarHidden} />
      <div style={{ display: "flex" }}>
        <SideBar siderBarState={siderBarState} />
        <Switch location={background || location}>
          <Route path="/home">
            <HomePage siderBarState={siderBarState} />
          </Route>
          <Route path="/market" component={Market} />
          <Route path="/group" component={TeamGroup} />
          <Route path="/Content" component={Content} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
