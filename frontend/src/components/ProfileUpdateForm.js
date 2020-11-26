import React from "react";

// MaterialUI Imports
import {
  Button,
  makeStyles,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  MuiTypography: {
    color: "white",
  },
  MuiTextField: {
    color: "white",
  },
}));

const ProfileUpdateForm = ({ userInfo }) => {
  const classes = useStyles();

  const { name, email } = userInfo;

  return (
    <form>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} lg={12}>
          <Typography
            className={classes.MuiTypography}
            variant="h5"
            align="center"
          >
            {name}'s Profile
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <TextField id="email" label="Email" type="email" variant="outlined" />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            className={classes.MuiTypography}
            variant="subtitle1"
            align="center"
          >
            Avatar image
          </Typography>
          <Button variant="contained" component="label">
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
        <Grid item xs={12} lg={12}>
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

        <Grid item xs={12} lg={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} lg={12}>
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

            <Grid item xs={12} lg={12}>
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
          <Grid item xs={12} lg={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} lg={12}>
                <Typography
                  className={classes.MuiTypography}
                  variant="subtitle2"
                  align="center"
                >
                  Change Password
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileUpdateForm;
