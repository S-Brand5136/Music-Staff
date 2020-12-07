import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  likeDiscussion,
  dislikeDiscussion,
  getDiscussionById,
} from "../actions/discussionActions";

// MaterialUI Imports
import {
  Button,
  Grid,
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

const PostListItem = ({ dis }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const like = useSelector((state) => state.like);
  const { success } = like;

  const dislike = useSelector((state) => state.dislike);
  const { success: dislikeSuccess } = dislike;

  const discussion = useSelector((state) => state.discussion);
  const { likes: updatedLikes, dislikes: updatedDislikes } = discussion;

  let {
    numComments,
    postedBy,
    title,
    badge,
    likes,
    dislikes,
    createdAt,
    _id,
  } = dis;

  useEffect(() => {
    if (success || dislikeSuccess) {
      dispatch(getDiscussionById(discussion));
      likes = updatedLikes;
      dislikes = updatedDislikes;
    }
  }, [success, dislikeSuccess]);

  return (
    <ListItem className={classes.MuiListItem}>
      <Grid container>
        <Grid item lg={3}>
          <ListItemText>
            <NavLink to="/" activeClasses="navLink">
              <Typography>
                {title}{" "}
                {badge && <Chip label={badge} color="primary" size="small" />}
              </Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <NavLink to="/" activeClasses="navLink">
              <Typography>Posted By: {postedBy}</Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <Typography>Replies: {numComments}</Typography>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <Button
              className={classes.MuiButton}
              startIcon={<ArrowUpward />}
              onClick={() => dispatch(likeDiscussion(dis))}
            >
              <Typography>{likes.length}</Typography>
            </Button>
            <Button
              className={classes.MuiButton}
              startIcon={<ArrowDownward />}
              onClick={() => dispatch(dislikeDiscussion(dis))}
            >
              <Typography>{dislikes.length}</Typography>
            </Button>
          </ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default PostListItem;
