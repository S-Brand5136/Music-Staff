import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteDiscussion } from "../actions/discussionActions";

// MaterialUI Imports
import {
  Chip,
  Grid,
  makeStyles,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  MuiListItem: {
    margin: "1rem",
  },
  MuiButton: {},
}));

const DiscussionListItem = ({ discussion }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let {
    numComments,
    postedBy,
    title,
    badge,
    _id,
    user,
    createdAt,
  } = discussion;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = () => {
    dispatch(deleteDiscussion(discussion._id));
  };

  return (
    <ListItem className={classes.MuiListItem}>
      <Grid container>
        <Grid item lg={3}>
          <ListItemText>
            <NavLink to={`/discussion/${_id}`} className="navLink">
              <Typography variant="subtitle1">
                {title}{" "}
                {badge && <Chip label={badge} color="primary" size="small" />}
              </Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <NavLink to={`/profiles/${user}`} className="navLink">
              <Typography variant="subtitle1">Posted By: {postedBy}</Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <Typography variant="subtitle1">
              Created On: {new Date(createdAt).toLocaleDateString("en-gb")}
            </Typography>
          </ListItemText>
        </Grid>

        <Grid item lg={3}>
          {userInfo || (userInfo && userInfo.isAdmin) ? (
            <ListItem>
              <Typography variant="subtitle1">
                Replies: {numComments}{" "}
              </Typography>
              <IconButton
                style={{ padding: "0", marginLeft: "1rem" }}
                color="secondary"
                onClick={() => deleteHandler()}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ) : (
            <ListItemText>
              <Typography variant="subtitle1">
                Replies: {numComments}{" "}
              </Typography>
            </ListItemText>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};
export default DiscussionListItem;
