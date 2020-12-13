import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Material UI imports
import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Delete, Flag, Reply } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  MuiTypography: {
    color: "white",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  MuiGrid: {
    marginTop: "1rem",
  },
}));

const DiscussPageItem = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const deleteHandler = () => {
    // TODO: Create delete comment, post
  };

  const replyHandler = () => {
    // TODO: Create comment action
  };

  const flagHandler = () => {
    // TODO: Create flag action
  };

  return (
    <Paper variant="outlined" square>
      <Grid container direction="row" spacing={4}>
        <Grid item lg={6}>
          <Grid
            className={classes.MuiGrid}
            container
            justify="center"
            spacing={2}
            alignItems="center"
            direction="row"
          >
            <Grid item lg={2}>
              <Avatar
                className={classes.large}
                src={data.avatar}
                variant="circle"
                alt="Profile Image"
              />
            </Grid>
            <Grid item lg={8}>
              <Typography variant="h6">
                Posted By:{" "}
                <Link style={{ color: "black" }} to="/profile/:id">
                  {data.postedBy}
                </Link>
              </Typography>
              <Typography variant="subtitle2">
                Posted on:{" "}
                {new Date(data.createdAt).toLocaleDateString("en-gb")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <Typography variant="body1" align="center">
            {data.text}
          </Typography>
        </Grid>
        <Grid item lg={4}>
          <Grid container justify="center" direction="row" alignItems="center">
            <Grid item lg={12}>
              <IconButton color="primary">
                <Reply /> <Typography variant="button">Reply</Typography>
              </IconButton>
              <IconButton color="primary">
                <Flag /> <Typography variant="button">Flag</Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {(userInfo && userInfo._id === data.user) ||
        userInfo.isAdmin === true ? (
          <Grid item lg={8}>
            <IconButton
              style={{ float: "right" }}
              color="secondary"
              onClick={() => deleteHandler()}
            >
              <Delete />
            </IconButton>
          </Grid>
        ) : (
          " "
        )}
      </Grid>
    </Paper>
  );
};

export default DiscussPageItem;
