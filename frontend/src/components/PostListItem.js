import React from "react";
import { NavLink } from "react-router-dom";

// MaterialUI Imports
import {
  Button,
  Chip,
  makeStyles,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";

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
  const {
    numComments,
    postedBy,
    title,
    category,
    badge,
    likes,
    dislikes,
    createdAt,
  } = discussion;

  return (
    <ListItem className={classes.MuiListItem}>
      <ListItemText>
        <NavLink to="/" activeClasses="navLink">
          <Typography>
            {title}{" "}
            {badge && <Chip label={badge} color="primary" size="small" />}
          </Typography>
        </NavLink>
      </ListItemText>
      <ListItemText>
        <NavLink to="/" activeClasses="navLink">
          <Typography>Posted By: {postedBy}</Typography>
        </NavLink>
      </ListItemText>
      <ListItemText>
        <Typography>Replies: {numComments}</Typography>
      </ListItemText>
      <ListItemText>
        <Button className={classes.MuiButton} startIcon={<ArrowUpward />}>
          <Typography>{likes.length}</Typography>
        </Button>
        <Button className={classes.MuiButton} startIcon={<ArrowDownward />}>
          <Typography>{dislikes.length}</Typography>
        </Button>
      </ListItemText>
    </ListItem>
  );
};

export default PostListItem;
