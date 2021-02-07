import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteDiscussion } from "../actions/discussionActions";

// MaterialUI Imports
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Delete, Flag } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  MuiListItem: {
    margin: "1rem",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
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
    archived,
  } = discussion;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = () => {
    dispatch(deleteDiscussion(discussion._id));
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ListItem className={classes.MuiListItem}>
      <Grid container>
        <Grid item lg={3} xs={4}>
          <ListItemText>
            <NavLink to={`/discussion/${_id}`} className="navLink">
              <Typography variant="subtitle1">
                {title}{" "}
                {badge && <Chip label={badge} color="primary" size="small" />}
              </Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3} xs={8}>
          <ListItemText>
            <NavLink to={`/profiles/${user}`} className="navLink">
              <Typography variant="subtitle1">Posted By: {postedBy}</Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3} xs={6}>
          <ListItemText>
            <Typography variant="subtitle1">
              Created On: {new Date(createdAt).toLocaleDateString("en-gb")}
            </Typography>
          </ListItemText>
        </Grid>

        <Grid item lg={3} xs={6}>
          {userInfo &&
          (userInfo._id === discussion.user || userInfo.isAdmin) ? (
            <ListItem>
              <Typography variant="subtitle1">
                Replies: {numComments}
              </Typography>
              <IconButton
                style={{ padding: "0", marginLeft: "1rem" }}
                color="secondary"
                onClick={() => handleClickOpen()}
              >
                <Delete />
              </IconButton>
              {userInfo.isAdmin && (
                <Flag color={archived ? "secondary" : "primary"} />
              )}
            </ListItem>
          ) : (
            <ListItemText>
              <Typography variant="subtitle1">
                Replies: {numComments}
              </Typography>
            </ListItemText>
          )}
        </Grid>
      </Grid>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Delete Post
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To delete the selected post click on the confirm button, or click
              cancel to close the dialog
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => handleClose()} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => deleteHandler()} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ListItem>
  );
};
export default DiscussionListItem;
