import React, { useState } from "react";

// MaterialUI Imports
import {
  Box,
  Button,
  Divider,
  LinearProgress,
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
  const { bio, avatar, social } = userProfile;

  const [newBio, setNewBio] = useState("");
  const [newYoutube, setNewYoutube] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [newTwitter, setNewTwitter] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");

  // TODO: Write useEffect function that gets User userProfile details
  // TODO: Seperate both update forms into two seperate components

  return (
    <Box>
      <form>
        {!userProfile ? (
          <LinearProgress color="primary" />
        ) : (
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
                type="text"
                multiline
                rows={4}
                rowsMax={4}
                variant="outlined"
                placeholder={bio}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
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
                variant="outlined"
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
                    type="text"
                    multiline
                    variant="outlined"
                    placeholder={social[0].youtube}
                    value={newYoutube}
                    onChange={(e) => setNewYoutube(e.target.value)}
                  />
                  <TextField
                    className={classes.MuiTextField}
                    id="twitter"
                    type="text"
                    multiline
                    variant="outlined"
                    placeholder={social[2].instagram}
                    value={newInstagram}
                    onChange={(e) => setNewInstagram(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField
                    className={classes.MuiTextField}
                    id="instagram"
                    type="text"
                    multiline
                    variant="outlined"
                    placeholder={social[1].twitter}
                    value={newTwitter}
                    onChange={(e) => setNewTwitter(e.target.value)}
                  />
                  <TextField
                    className={classes.MuiTextField}
                    id="linkedin"
                    type="text"
                    multiline
                    variant="outlined"
                    placeholder={social[3].linkedin}
                    value={newLinkedin}
                    onChange={(e) => setNewLinkedin(e.target.value)}
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
        )}
      </form>
    </Box>
  );
};

export default ProfileUpdateForm;
