import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { register } from "../actions/userActions";

// MaterialUI imports
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  LinearProgress,
  TextField,
  Typography,
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
  const [passwordTwo, setPasswordTwo] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== passwordTwo) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item id="signin" xs={12} lg={12} xl={12} md={12}>
          <Typography variant="h3">Register</Typography>
          <Typography variant="body1">
            Please enter your email, password, and name to register an account
          </Typography>
          {loading && <LinearProgress />}
          {message && <Message variant="error" message={message} open={true} />}
          {error && <Message variant="error" message={error} open={true} />}
        </Grid>

        <Divider />

        <Grid item id="form">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <Grid container spacing={6} direction="row">
              <Grid item xs={12} md={9} lg={9} xl={4}>
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={9} lg={9} xl={6}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={9} lg={9} xl={4}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={9} lg={9} xl={4}>
                <TextField
                  id="password"
                  label="Confirm Password"
                  type="password"
                  onChange={(e) => setPasswordTwo(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={9} xl={6}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  id="btn-signin"
                  disableElevation={true}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} md={9} ld={9} xl={12}>
                <Typography variant="body1">
                  have an account ?{" "}
                  <Link
                    style={{ color: "#52D6F4" }}
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Sign in here!
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
