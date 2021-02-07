import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateLogin, logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import Message from "../components/Message";

// MaterialUI imports
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  MuiTextField: {
    color: "white",
    margin: "1rem",
  },
  MuiPaper: {
    background: "grey",
    marginBottom: "2rem",
  },
  MuiTypography: {
    margin: "1rem",
  },
}));

const UpdateUserLogin = ({ userInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { email } = userInfo;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error: updateError } = userUpdate;
  const [newEmail, setEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      (password === passwordConfirm && password !== "") ||
      passwordConfirm !== ""
    ) {
      const user = { newEmail, password };
      dispatch(userUpdateLogin(user));
      setPassword("");
      setPasswordConfirm("");
      dispatch(logout());
      history.push("/");
    } else {
      setErrorMessage("Error in updating login info, try again");
      setPassword("");
      setPasswordConfirm("");

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <Box>
      {(errorMessage || updateError) && (
        <Grid item lg={12}>
          <Message
            message={errorMessage ? errorMessage : updateError}
            variant="error"
            open={true}
          />
        </Grid>
      )}
      <form onSubmit={(e) => submitHandler(e)}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item container justify="center" xs={12} lg={12}>
            <Typography
              className={classes.MuiTypography}
              variant="h5"
              align="center"
            >
              Update User Login Info
            </Typography>
            <Divider variant="middle" />
          </Grid>

          <Grid item container justify="center" xs={12} lg={6}>
            <TextField
              className={classes.MuiTextField}
              id="email"
              label={email}
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={classes.MuiTextField}
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              className={classes.MuiTextField}
              id="passwordTwo"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Grid>
          <Grid item container justify="center" lg={12}>
            <Button variant="outlined" type="Submit">
              Update User Info
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateUserLogin;
