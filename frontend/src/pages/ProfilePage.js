import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../actions/profileActions";
import { listUsersAdmin } from "../actions/userActions";
import { getDiscussions } from "../actions/discussionActions";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import ProfileTabTable from "../components/ProfileTabTable";
import UpdateUserLogin from "../components/UpdateUserLogin";
import ListUsersItem from "../components/ListUsersItem";
import DiscussionListItem from "../components/DiscussionListItem";
import Message from "../components/Message";

// MaterialUI imports
import {
  Avatar,
  Box,
  Divider,
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
  marginBot: {
    marginBottom: "2.5rem",
  },
  boxScroll: {
    maxHeight: "40rem",
    maxWidth: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
  boxStyling: {
    paddingLeft: "2rem",
    marginTop: "2rem",
    [theme.breakpoints.only("lg")]: {
      paddingLeft: "20rem",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "2rem",
    },
  },
}));

const ProfilePage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, userProfile: profile, error } = userProfile;

  const updateProfile = useSelector((state) => state.updateProfile);
  const { reload } = updateProfile;

  const adminDeleteUser = useSelector((state) => state.adminDeleteUser);
  const {
    loading: adminDeleteUserLoading,
    error: adminDeleteUserError,
    success,
  } = adminDeleteUser;

  const discussions = useSelector((state) => state.discussions);
  const { discussionList: adminDiscussionList } = discussions;

  const userList = useSelector((state) => state.userList);
  const {
    userList: list,
    loading: userListLoading,
    error: userListError,
  } = userList;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      dispatch(getProfile());
    } else {
      dispatch(listUsersAdmin());
      dispatch(getDiscussions());
    }
  }, [reload, success]);

  if (!userInfo) {
    history.push("/");
  }
  return (
    <Box className={classes.boxStyling}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
        className={classes.marginBot}
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          style={{ marginBottom: "3rem" }}
        >
          <Grid style={{ marginTop: "1rem" }} item lg={6}>
            <Avatar
              className={classes.large}
              src={loading ? "loading.." : profile.avatar}
            />
          </Grid>
          <Grid item style={{ marginTop: "1rem" }} lg={6}>
            <Typography
              variant="h2"
              style={{ padding: "none", margin: "none" }}
            >
              {userInfo.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <Divider />
        </Grid>
        <Grid item lg={12} style={{ marginBottom: "3rem" }}>
          {error && (
            <Message
              variant="error"
              message="error gathering profile details"
              open={true}
            />
          )}
          {userListError && (
            <Message
              variant="error"
              message="error gathering user list details"
              open={true}
            />
          )}
          {adminDeleteUserError && (
            <Message
              variant="error"
              message="error deleting user details"
              open={true}
            />
          )}
          {success && (
            <Message
              variant="success"
              message="success, user deleted!"
              open={true}
            />
          )}
        </Grid>
        {loading && !userInfo.isAdmin ? (
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <LinearProgress color="primary" />
          </Grid>
        ) : (
          <>
            {userInfo.isAdmin ? (
              <>
                {userListLoading ? (
                  <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                    <LinearProgress color="primary" />
                  </Grid>
                ) : (
                  <>
                    <>
                      <Typography variant="h5">Welcome Admin!</Typography>
                      <Grid item lg={12}>
                        <List className={classes.boxScroll}>
                          {list.map((user) => (
                            <ListUsersItem key={user} user={user} />
                          ))}
                        </List>
                      </Grid>
                    </>
                    <>
                      <Grid item lg={12}>
                        <List className={classes.boxScroll}>
                          {adminDiscussionList.map((item) => (
                            <DiscussionListItem key={item} discussion={item} />
                          ))}
                        </List>
                      </Grid>
                    </>
                  </>
                )}
              </>
            ) : (
              <>
                <Grid item xs={12} lg={12} style={{ marginBottom: "3rem" }}>
                  <ProfileTabTable userProfile={profile} />
                </Grid>
                <Grid item xs={12} lg={6} style={{ marginBottom: "3rem" }}>
                  <ProfileUpdateForm
                    userInfo={userInfo}
                    userProfile={profile}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <UpdateUserLogin userInfo={userInfo} />
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProfilePage;
