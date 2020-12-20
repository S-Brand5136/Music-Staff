import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteComment,
  flagComment,
  flagDiscussion,
} from "../actions/discussionActions";
import Dialog from "../components/Dialog";
import { CREATE_COMMENT_REQUEST } from "../constants/discussionConstants";

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

  const createComment = useSelector((state) => state.createComment);
  const { open } = createComment;

  const [colour, setColour] = useState("primary");

  const deleteHandler = () => {
    dispatch(deleteComment(data._id, discussionId));
  };

  const replyHandler = () => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
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
              onClick={() => deleteHandler()}
            >
              <Delete />
            </IconButton>
          </Grid>
        ) : (
          " "
        )}
      </Grid>
      {open && <Dialog />}
    </Paper>
  );
};

export default DiscussPageItem;
