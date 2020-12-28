import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../actions/profileActions";
import { listUsersAdmin } from "../actions/userActions";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import ProfileTabTable from "../components/ProfileTabTable";
import UpdateUserLogin from "../components/UpdateUserLogin";
import ListUsersItem from "../components/ListUsersItem";
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
    }
  }, [reload, success]);

  if (!userInfo) {
    history.push("/");
  }

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
        <Grid item lg={12}>
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
                    <Typography variant="h5">Welcome Admin!</Typography>
                    <Grid item lg={12}>
                      <List>
                        {list.map((user) => (
                          <ListUsersItem key={user} user={user} />
                        ))}
                      </List>
                    </Grid>
                  </>
                )}
              </>
            ) : (
              <>
                <Grid item xs={12} lg={12}>
                  <ProfileTabTable userProfile={profile} />
                </Grid>
                <Grid item xs={12} lg={6}>
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
