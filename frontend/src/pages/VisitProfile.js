import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../actions/profileActions";

// Material UI
import {
  Avatar,
  Box,
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
}));

const VisitProfile = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch]);

  const userProfile = useSelector((state) => state.userProfileById);
  const { userProfileById, loading, error } = userProfile;

  return (
    <Box>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item xs={12} lg={6}>
            <Avatar
              alt="userAvatar"
              className={classes.large}
              src="../../public/images/avatar.jpeg"
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Typography variant="h2"></Typography>
          </Grid>
          <Grid item xs={12} xl={6}></Grid>
          <Grid item xs={12} xl={6}></Grid>
        </Grid>
      )}
    </Box>
  );
};

export default VisitProfile;
