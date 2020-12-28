import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import {
  deleteComment,
  flagComment,
  flagDiscussion,
  createComment,
} from "../actions/discussionActions";
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_CLOSE,
} from "../constants/discussionConstants";

// Material UI imports
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import { Delete, Flag, Reply } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  MuiGrid: {
    marginTop: "1rem",
  },
}));

const DiscussPageItem = ({ data, discussionId, OGpost }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const commentCreation = useSelector((state) => state.createComment);
  const { open } = commentCreation;

  const [colour, setColour] = useState("primary");
  const [openDelete, setOpenDelete] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [errorText, setErrorText] = useState(null);

  const deleteHandler = () => {
    dispatch(deleteComment(data._id, discussionId));
  };

  const replyHandler = () => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
  };

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleCommentClose = () => {
    dispatch({ type: CREATE_COMMENT_CLOSE });
  };

  const createCommentHandler = () => {
    if (commentText === "") {
      setErrorText("Unable to post comment");

      setTimeout(() => {
        setErrorText(null);
      }, 3000);
    } else {
      dispatch(createComment(commentText));
      setCommentText("");
    }
  };

  const flagHandler = () => {
    if (OGpost) {
      dispatch(flagDiscussion(data._id));
    } else {
      dispatch(flagComment(data._id, discussionId));
    }
    setColour("secondary");
  };

  useEffect(() => {
    if (data.flag > 0) {
      setColour("secondary");
    }
  }, [data.flag]);

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
              <Typography
                style={{ color: "black" }}
                variant="h6"
                className={classes.MuiTypography}
              >
                Posted By:{" "}
                <Link style={{ color: "black" }} to={`/profiles/${data.user}`}>
                  {data.postedBy}
                </Link>
              </Typography>
              <Typography
                style={{ color: "black" }}
                variant="subtitle2"
                className={classes.MuiTypography}
              >
                Posted on:{" "}
                {new Date(data.createdAt).toLocaleDateString("en-gb")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <Typography
            style={{ color: "black" }}
            className={classes.MuiTypography}
            variant="body1"
            align="center"
          >
            {data.text}
          </Typography>
        </Grid>
        <Grid item lg={4}>
          <Grid container justify="center" direction="row" alignItems="center">
            <Grid item lg={12}>
              <IconButton color="primary" onClick={() => replyHandler()}>
                <Reply />{" "}
                <Typography
                  style={{ color: "black" }}
                  className={classes.MuiTypography}
                  variant="button"
                >
                  Reply
                </Typography>
              </IconButton>
              <IconButton color={colour} onClick={() => flagHandler()}>
                <Flag />{" "}
                <Typography
                  style={{ color: "black" }}
                  className={classes.MuiTypography}
                  variant="button"
                >
                  Flag
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {userInfo && (userInfo._id === data.user || userInfo.isAdmin) ? (
          <Grid item lg={8}>
            <IconButton
              style={{ float: "right" }}
              color="secondary"
              onClick={() => handleClickOpen()}
            >
              <Delete />
            </IconButton>
          </Grid>
        ) : (
          " "
        )}
      </Grid>
      {open && (
        <div>
          <Dialog open={open} onClose={handleCommentClose}>
            <DialogTitle style={{ cursor: "move" }} id="delete-comment">
              Create Comment
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To create a comment add text below, and click on the confirm
                button. Click cancel to close the dialog
              </DialogContentText>
              <form aria-label="comment-text-box">
                <TextField
                  className={classes.MuiTextField}
                  id="comment-text"
                  label="Comment"
                  type="text"
                  variant="outlined"
                  multiline
                  rows={7}
                  fullWidth
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </form>
              {errorText && (
                <Message message={errorText} variant="error" open={true} />
              )}
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => handleCommentClose()}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={() => createCommentHandler()} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <div>
        <Dialog
          open={openDelete}
          onClose={handleClose}
          aria-labelledby="Delete comment"
        >
          <DialogTitle style={{ cursor: "move" }} id="delete-comment">
            Delete Comment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To delete the selected comment click on the confirm button, or
              click cancel to close the dialog
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
    </Paper>
  );
};

export default DiscussPageItem;
