import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUserProfile } from "../actions/profileActions";
import Message from "../components/Message";

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
  MuiGrid: {
    margin: "1rem",
  },
}));

const ProfileUpdateForm = ({ userInfo, userProfile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { name } = userInfo;
  const { bio, social } = userProfile;

  const [newBio, setNewBio] = useState(null);
  const [newYoutube, setNewYoutube] = useState(null);
  const [newInstagram, setNewInstagram] = useState(null);
  const [newTwitter, setNewTwitter] = useState(null);
  const [newLinkedin, setNewLinkedin] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, error, success } = updateProfile;

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      newBio ||
      newYoutube ||
      newInstagram ||
      newTwitter ||
      newLinkedin ||
      avatar
    ) {
      dispatch(
        updateUserProfile(
          newBio,
          newYoutube,
          newInstagram,
          newTwitter,
          newLinkedin,
          avatar
        )
      );
      setNewBio("");
      setNewYoutube("");
      setNewInstagram("");
      setNewTwitter("");
      setNewLinkedin("");
    } else {
      setErrorMessage("Profile fields are empty, review input");

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setAvatar(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setAvatar(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <Box>
      {success && (
        <Grid item lg={12} className={classes.MuiGrid}>
          <Message
            message={"Profile successfully updated! reloading...."}
            variant="success"
            open={true}
          />
        </Grid>
      )}
      {loading && !success ? (
        <LinearProgress color="primary" />
      ) : (
        <form onSubmit={(e) => submitHandler(e)}>
          {!userProfile ? (
            <LinearProgress color="primary" />
          ) : (
            <Grid container justify="center" direction="row">
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
              <Grid item container justify="center" xs={12} lg={6}>
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

              <Grid
                item
                container
                alignItems="center"
                justify="center"
                xs={12}
                lg={8}
              >
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
                  <input
                    type="file"
                    onClick={(e) => uploadFileHandler(e)}
                    hidden
                  />
                </Button>
                <TextField
                  id="filename"
                  placeholder="File Name"
                  type="text"
                  variant="outlined"
                  value={avatar}
                />
                {uploading && <LinearProgress color="primary" />}
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
                  <Grid item container justify="center" xs={12} lg={6}>
                    <TextField
                      className={classes.MuiTextField}
                      id="youtube"
                      type="text"
                      multiline
                      variant="outlined"
                      placeholder={social.youtube ? social.youtube : "Youtube"}
                      value={newYoutube}
                      onChange={(e) => setNewYoutube(e.target.value)}
                    />
                    <TextField
                      className={classes.MuiTextField}
                      id="twitter"
                      type="text"
                      multiline
                      variant="outlined"
                      placeholder={
                        social.instagram ? social.instagram : "Instagram"
                      }
                      value={newInstagram}
                      onChange={(e) => setNewInstagram(e.target.value)}
                    />
                  </Grid>

                  <Grid item container justify="center" xs={12} lg={6}>
                    <TextField
                      className={classes.MuiTextField}
                      id="instagram"
                      type="text"
                      multiline
                      variant="outlined"
                      placeholder={social.twitter ? social.twitter : "Twitter"}
                      value={newTwitter}
                      onChange={(e) => setNewTwitter(e.target.value)}
                    />
                    <TextField
                      className={classes.MuiTextField}
                      id="linkedin"
                      type="text"
                      multiline
                      variant="outlined"
                      placeholder={
                        social.linkedin ? social.linkedin : "Linkedin"
                      }
                      value={newLinkedin}
                      onChange={(e) => setNewLinkedin(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container justify="center" lg={12}>
                  <Button variant="outlined" onClick={(e) => submitHandler(e)}>
                    Update Profile
                  </Button>
                </Grid>
                {errorMessage && (
                  <Grid item lg={12} className={classes.MuiGrid}>
                    <Message
                      message={error ? error : errorMessage}
                      variant="error"
                      open={true}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </form>
      )}
    </Box>
  );
};

export default ProfileUpdateForm;
