import React from "react";
import { useSelector } from "react-redux";

// MaterialUI Imports
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  MuiTextField: {
    margin: "1rem",
  },
  MuiPaper: {
    background: "grey",
    marginBottom: "2rem",
  },
  MuiButton: {
    marginRight: ".5rem",
  },
  MuiTypography: {
    margin: "1rem",
  },
}));

const ProfileUpdateForm = ({ userInfo, userProfile }) => {
  const classes = useStyles();
  const { name, email } = userInfo;

  // TODO: Write useEffect function that gets User profile details
  // TODO: Seperate both update forms into two seperate components

  return (
    <Box>
      <form>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={12} lg={12}>
            <Typography
              className={classes.MuiTypography}
              variant="h5"
              align="center"
            >
              {name}'s Profile
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} lg={6}>
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
              <Button variant="outlined" fullWidth>
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProfileUpdateForm;
