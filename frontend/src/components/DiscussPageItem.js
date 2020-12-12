import React from "react";

// Material UI imports
import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Reply, Flag } from "@material-ui/icons";

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
              <Typography variant="h6">Posted By: {data.postedBy}</Typography>
              <Typography variant="subtitle2">
                Posted on: {data.createdAt}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <Typography variant="body1" align="center">
            {data.text}
          </Typography>
        </Grid>
        <Grid item lg={6}>
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
      </Grid>
    </Paper>
  );
};

export default DiscussPageItem;
