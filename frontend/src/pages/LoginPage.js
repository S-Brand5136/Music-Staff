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
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  boxStyling: {
    marginTop: "2rem",
    paddingLeft: "2rem",
    [theme.breakpoints.only("lg")]: {
      paddingLeft: "17rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0rem",
    },
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
    <Box className={classes.boxStyling}>
      <Grid container direction="row">
        <Grid item id="signin" xs={12} lg={12} xl={12} md={12}>
          <Typography
            style={{ marginLeft: "1rem", padding: "0", marginTop: "2rem" }}
            variant="h3"
          >
            Sign In
          </Typography>
          <Typography style={{ margin: "1rem", padding: "0" }} variant="body1">
            Welcome back! Enter your credentials below to sign in
          </Typography>
          {loading && <LinearProgress />}
          {error && <Message message={error} variant="error" open={true} />}
        </Grid>
        <Divider />

        <Grid item id="form">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <Grid container spacing={4} direction="row">
              <Grid item xs={10} md={9} lg={9} xl={12}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={10} md={9} lg={9} xl={12}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={10} md={9} xl={3}>
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
                <Typography variant="body1">
                  Don't have an account ?{" "}
                  <Link
                    style={{ color: "#363538" }}
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
