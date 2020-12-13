import React from "react";
import { NavLink } from "react-router-dom";

// MaterialUI Imports
import {
  Grid,
  Chip,
  makeStyles,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  MuiListItem: {
    color: "white",
    margin: "1rem",
  },
  MuiButton: {
    color: "white",
  },
}));

const PostListItem = ({ discussion }) => {
  const classes = useStyles();

  let {
    numComments,
    postedBy,
    title,
    badge,
    _id,
    user,
    createdAt,
  } = discussion;

  return (
    <ListItem className={classes.MuiListItem}>
      <Grid container>
        <Grid item lg={3}>
          <ListItemText>
            <NavLink to={`/discussion/${_id}`} activeClasses="navLink">
              <Typography>
                {title}{" "}
                {badge && <Chip label={badge} color="primary" size="small" />}
              </Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <NavLink to={`/profile/${user}`} activeClasses="navLink">
              <Typography>Posted By: {postedBy}</Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <Typography variant="subtitle2">
              Created On: {new Date(createdAt).toLocaleDateString("en-gb")}
            </Typography>
          </ListItemText>
        </Grid>

        <Grid item lg={3}>
          <ListItemText>
            <Typography>Replies: {numComments}</Typography>
          </ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};
export default PostListItem;
