import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../actions/profileActions";
import DiscussionListItem from "../components/DiscussionListItem";
import DiscussPageItem from "../components/DiscussPageItem";

// Material UI
import {
  Avatar,
  Box,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const VisitProfile = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getProfileById(match.params.id));
    }
    fetchData();
  }, [dispatch, match]);

  const userProfile = useSelector((state) => state.userProfileById);
  const { userProfileById, loading, error } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (userInfo && !loading) {
    if (userProfileById.user._id === userInfo._id) {
      history.push(`/profile`);
    }
  }

  return (
    <Box>
      {error && "error"}
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
          <Grid item xs={12} lg={6}>
            <Avatar
              alt="userAvatar"
              className={classes.large}
              src="../../public/images/avatar.jpeg"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h2" className={classes.MuiTypography}>
              {userProfileById.user.name}
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Divider />
          </Grid>
          {!userProfileById.discussion && !userProfileById.comments ? (
            <Grid item lg={6}>
              <Typography variant="h5">
                This User has not made any comments or posts!
              </Typography>
            </Grid>
          ) : (
            <Grid container variant="row">
              <Grid item xs={12} xl={6}>
                <List>
                  {userProfileById.discussions.map((item) => (
                    <DiscussionListItem key={item._id} discussion={item} />
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} xl={6}>
                <List>
                  {userProfileById.comments.map((item, index) => (
                    <ListItem key={index}>
                      <DiscussPageItem data={item} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default VisitProfile;
