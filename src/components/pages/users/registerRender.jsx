import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import { useStyles, Copyright } from "./makeStyles";

const RegisterRender = ({ handleSubmit, data, handleChange, errors }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.toolbar} />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          注册用户
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                //  error={errors.name ? "error" : ""}
                error={errors.name}
                autoFocus
                variant="outlined"
                autoComplete="name"
                // require
                fullWidth
                label="姓名"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                //  error={errors.email ? "error" : ""}
                error={errors.email}
                variant="outlined"
                autoComplete="email"
                // required
                fullWidth
                label="邮箱地址"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error={errors.password ? "error" : ""}
                error={errors.password}
                variant="outlined"
                autoComplete="password"
                type="password"
                // required
                fullWidth
                label="密码"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="我希望通过电子邮件获得灵感、市场推广和更新。"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            点击注册
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                {/* <Link variant="body2">已经有账户了吗？登录</Link> */}
                已经有账户了吗？登录
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default RegisterRender;
