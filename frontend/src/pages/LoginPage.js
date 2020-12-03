import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

// MaterialUI imports
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  multilineColor: {
    color: "white",
  },
  root: {
    color: "white",
  },
}));

const LoginPage = ({ location, history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Box>
      <Grid container>
        <Grid item id="signin" xs={12} lg={12} xl={12} md={12}>
          <Typography variant="h3">Sign In</Typography>
          <Typography variant="body1">
            Please enter your Music Staff email and password to sign in
          </Typography>
          {loading && <LinearProgress />}
          {error && <Message message={error} variant="error" />}
        </Grid>
        <Divider />

        <Grid item id="form">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <Grid container spacing={6} direction="row">
              <Grid item xs={12} md={9} lg={9} xl={12}>
                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  InputProps={{
                    className: classes.root,
                  }}
                  id="email"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={9} lg={9} xl={12}>
                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  InputProps={{ className: classes.multilineColor }}
                  id="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={9} xl={3}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  id="btn-signin"
                  disableElevation={true}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12} md={9} ld={9} xl={12}>
                <Typography variant="body1" style={{ color: "white" }}>
                  Don't have an account ?{" "}
                  <Link
                    style={{ color: "#52D6F4" }}
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                  >
                    Make one here!
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
