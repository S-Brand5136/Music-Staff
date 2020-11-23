import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// MaterialUI imports
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import {
  Box,
  Collapse,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

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
  const [open, setOpen] = useState(false);

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

    if (password !== passwordTwo) {
      setMessage("Passwords do not match!");
      setOpen(true);
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
          {message && (
            <Collapse in={open}>
              <Alert
                style={{ width: "75%" }}
                variant="filled"
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                {message}
              </Alert>
            </Collapse>
          )}
        </Grid>

        <Divider />

        <Grid item id="form">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <Grid container spacing={6} direction="row">
              <Grid item xs={12} md={9} lg={9} xl={4}>
                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  InputProps={{
                    className: classes.root,
                  }}
                  id="name"
                  label="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={9} lg={9} xl={6}>
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
                ></TextField>
              </Grid>
              <Grid item xs={12} md={9} lg={9} xl={4}>
                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  InputProps={{ className: classes.multilineColor }}
                  id="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={9} lg={9} xl={4}>
                <TextField
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  InputProps={{ className: classes.multilineColor }}
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
                <Typography variant="body1" style={{ color: "white" }}>
                  have an account ?{" "}
                  <Link
                    style={{ color: "brown" }}
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