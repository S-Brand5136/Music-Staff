import React from "react";
import { useSelector } from "react-redux";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import ProfileTabTable from "../components/ProfileTabTable";

// MaterialUI imports
import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // TODO: ADD ADMIN SUPPORT

  return (
    <Box>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12} lg={6}>
          <Avatar
            className={classes.large}
            src="../../public/images/avatar.jpeg"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h2">{userInfo.name}</Typography>
        </Grid>
        <Grid item xs={12} xl={6}>
          <ProfileUpdateForm userInfo={userInfo} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <ProfileTabTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
