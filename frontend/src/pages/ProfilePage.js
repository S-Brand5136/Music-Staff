import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../actions/profileActions";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import ProfileTabTable from "../components/ProfileTabTable";
import UpdateUserLogin from "../components/UpdateUserLogin";
import Message from "../components/Message";

// MaterialUI imports
import {
  Avatar,
  Box,
  Divider,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  marginBot: {
    marginBottom: "2.5rem",
  },
}));

const ProfilePage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, userProfile: profile, error } = userProfile;

  if (!userInfo) {
    history.push("/");
  }

  // TODO: ADD ADMIN SUPPORT
  // TODO: Fix discussionPageDelete object to cast fail

  return (
    <Box>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
        spacing={4}
        className={classes.marginBot}
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} lg={6}>
            <Avatar
              className={classes.large}
              src="../../public/images/avatar.jpeg"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h2">{userInfo.name}</Typography>
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <Divider />
        </Grid>
        {loading ? (
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <LinearProgress color="primary" />
          </Grid>
        ) : error ? (
          <Message
            variant="error"
            message="error gathering profile details"
            open={true}
          />
        ) : (
          <>
            <Grid item xs={12} lg={12}>
              <ProfileTabTable userInfo={userInfo} userProfile={profile} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ProfileUpdateForm userInfo={userInfo} userProfile={profile} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <UpdateUserLogin userInfo={userInfo} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProfilePage;
