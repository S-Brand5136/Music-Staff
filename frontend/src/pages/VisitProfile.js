import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../actions/profileActions";
import PostListItem from "../components/PostListItem";
import DiscussPageItem from "../components/DiscussPageItem";

// Material UI
import {
  Avatar,
  Box,
  Grid,
  LinearProgress,
  List,
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

  useEffect(async () => {
    await dispatch(getProfileById(match.params.id));
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
          {!userProfileById.discussion && !userProfileById.comments ? (
            <Box>
              <Typography variant="h5">
                This User has not made any comments or posts!
              </Typography>
            </Box>
          ) : (
            <Box>
              {" "}
              <Grid item xs={12} lg={4}>
                <Typography variant="h2" className={classes.MuiTypography}>
                  {userProfileById.user.name}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Typography variant="h2"></Typography>
              </Grid>
              <Grid item xs={12} xl={6}>
                <List>
                  {userProfileById.discussions.map((item) => (
                    <PostListItem discussion={item} />
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} xl={6}>
                <List>
                  {userProfileById.comments.map((item) => (
                    <DiscussPageItem data={item} />
                  ))}
                </List>
              </Grid>
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default VisitProfile;
