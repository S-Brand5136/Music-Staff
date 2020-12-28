import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { adminDeleteUser } from "../actions/userActions";

// MaterialUI Imports
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ListItemText,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const ListUsersItem = ({ user }) => {
  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);

  const deleteHandler = () => {
    dispatch(adminDeleteUser(user._id));
    setOpenDelete(false);
  };

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  return (
    <Box>
      <Grid container>
        <Grid item lg={3}>
          <ListItemText>
            <NavLink to={`/profiles/${user._id}`} className="navLink">
              <Typography variant="subtitle1">username: {user.name}</Typography>
            </NavLink>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <Typography variant="subtitle1">
              Created On: {new Date(user.createdAt).toLocaleDateString("en-gb")}
            </Typography>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <ListItemText>
            <Typography variant="subtitle1">email: {user.email}</Typography>
          </ListItemText>
        </Grid>
        <Grid item lg={3}>
          <IconButton
            style={{ float: "right" }}
            onClick={() => handleClickOpen()}
            color="secondary"
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
      <div>
        <Dialog
          open={openDelete}
          onClose={handleClose}
          aria-labelledby="Delete comment"
        >
          <DialogTitle style={{ cursor: "move" }} id="delete-comment">
            Remove User
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To delete the selected user click on the confirm button, or click
              cancel to close the window
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
    </Box>
  );
};

export default ListUsersItem;
