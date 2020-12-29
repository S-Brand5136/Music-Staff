import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../actions/profileActions";
import ProfileTabTable from "../components/ProfileTabTable";

// Material UI
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
  MuiTypography: {
    margin: "2rem",
  },
}));

const VisitProfile = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfileById);
  const { userProfileById, loading, error } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    async function fetchData() {
      await dispatch(getProfileById(match.params.id));
    }
    fetchData();
  }, [dispatch, match]);

  if (userInfo && !loading) {
    if (match.params.id === userInfo._id) {
      history.push(`/profile`);
    }
  }

  return (
    <Box>
      {error && (
        <Typography variant="h6">Uh oh! User cannot be found!</Typography>
      )}
      {loading || !userProfileById ? (
        <LinearProgress color="primary" />
      ) : (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item xs={6} lg={6}>
            <Avatar
              alt="userAvatar"
              className={classes.large}
              src={loading ? "loading.." : userProfileById.avatar}
            />
          </Grid>
          <Grid item xs={8} lg={6}>
            <Typography variant="h2" className={classes.MuiTypography}>
              {userProfileById.user.name}
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Divider />
          </Grid>
          {!userProfileById.discussion && !userProfileById.comments ? (
            <Grid item lg={6} xs={12}>
              <Typography variant="h5">
                This User has not made any comments or posts!
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item lg={12} xs={12}>
                <ProfileTabTable userProfile={userProfileById} />
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default VisitProfile;
