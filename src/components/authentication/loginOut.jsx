import { Component } from "react";
import auth from "../../services/authService";

class LoginOut extends Component {
  componentDidMount() {
    auth.loginOut();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default LoginOut;
