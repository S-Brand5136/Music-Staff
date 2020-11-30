import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// MaterialUI Imports
import {
  Box,
  Button,
  makeStyles,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  MuiTypography: {
    color: "white",
  },
  MuiTextField: {
    color: "white",
    margin: "1rem",
  },
  MuiPaper: {
    background: "grey",
    marginBottom: "2rem",
  },
  MuiButton: {
    marginRight: ".5rem",
  },
}));

const ProfileUpdateForm = ({ userInfo }) => {
  const classes = useStyles();
  const { name, email } = userInfo;
  const userProfile = useSelector((state) => state.userProfile);

  // TODO: Write useEffect function that gets User profile details

  return (
    <Box>
      <Paper
        variant="outlined"
        elementType="div"
        elevation={3}
        className={classes.MuiPaper}
      >
        <form>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={12} lg={12}>
              <Typography
                className={classes.MuiTypography}
                variant="h5"
                align="center"
                style={{ marginTop: "1rem" }}
              >
                {name}'s Profile
              </Typography>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Typography
                className={classes.MuiTypography}
                variant="subtitle1"
                align="center"
              >
                Profile Bio
              </Typography>
              <TextField
                className={classes.MuiTextField}
                id="Bio"
                label="Bio"
                type="text"
                multiline
                rows={4}
                rowsMax={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <Typography
                className={classes.MuiTypography}
                variant="subtitle1"
                align="center"
              >
                Avatar image
              </Typography>
              <Button
                variant="contained"
                className={classes.MuiButton}
                component="label"
              >
                Upload File
                <input type="file" hidden />
              </Button>
              <TextField
                id="filename"
                label="File Name"
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item lg={12}>
                  <Typography
                    className={classes.MuiTypography}
                    variant="subtitle1"
                    align="center"
                  >
                    Social Links
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    className={classes.MuiTextField}
                    id="youtube"
                    label="Youtube Link"
                    type="text"
                    multiline
                    variant="outlined"
                  />
                  <TextField
                    className={classes.MuiTextField}
                    id="twitter"
                    label="Twitter Username"
                    type="text"
                    multiline
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField
                    className={classes.MuiTextField}
                    id="instagram"
                    label="Instagram Username"
                    type="text"
                    multiline
                    variant="outlined"
                  />
                  <TextField
                    className={classes.MuiTextField}
                    id="linkedin"
                    label="Linkedin Link"
                    type="text"
                    multiline
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid item lg={12}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{ margin: "1rem" }}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper
        variant="outlined"
        elementType="div"
        elevation={3}
        className={classes.MuiPaper}
      >
        <form>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} lg={12}>
              <Typography
                className={classes.MuiTypography}
                variant="h5"
                align="center"
                style={{ marginTop: "1rem" }}
              >
                Update User Login Info
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                className={classes.MuiTextField}
                id="email"
                label={email}
                type="email"
                variant="outlined"
              />
              <TextField
                className={classes.MuiTextField}
                id="password"
                label="Password"
                type="password"
                variant="outlined"
              />
              <TextField
                className={classes.MuiTextField}
                id="passwordTwo"
                label="Confirm Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item lg={8}>
              <Button variant="contained" fullWidth style={{ margin: "1rem" }}>
                Update User Info
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ProfileUpdateForm;
