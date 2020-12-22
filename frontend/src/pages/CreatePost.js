import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createDiscussion } from "../actions/discussionActions";
import Message from "../components/Message";

// MaterialUI Imports
import {
  Button,
  Breadcrumbs,
  Box,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  makeStyles,
  Typography,
  TextField,
  Select,
  Paper,
  LinearProgress,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  MuiTextField: {
    color: "white",
    marginTop: "1rem",
  },
  MuiPaper: {
    background: "grey",
    marginBottom: "2rem",
    padding: "1rem",
    overflow: "hidden",
  },
  MuiButton: {
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "#363538",
      color: "white",
    },
  },
  MuiSelect: {
    position: "relative",
    top: ".5rem",
    width: "10rem",
  },
}));

const CreatePost = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [badge, setBadge] = useState("");
  const [category, setCategory] = useState("General");

  const createDisc = useSelector((state) => state.createDiscussion);
  const { error, loading, success } = createDisc;

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const submitDiscussion = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
    }
    dispatch(createDiscussion(title, body, badge, category));
    setTitle("");
    setBody("");
    setBadge("");

    setTimeout(() => {
      history.push("/");
    }, 3000);
  };

  return (
    <Box>
      <Grid container direction="row">
        <Grid item lg={10}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item lg={10}>
              <Typography variant="h3">Create a new Discussion</Typography>
              <Divider />
            </Grid>
            <Grid item lg={2}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">HomePage</Link>
                <Link> Create</Link>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={12} style={{ marginTop: "2rem" }}>
          <Paper className={classes.MuiPaper}>
            <Typography align="center" variant="h6" gutterBottom>
              Be sure to read the rules before posting!
            </Typography>
            <Divider variant="middle" style={{ marginBottom: "1rem" }} />
            <Box style={{ marginLeft: "1rem" }}>
              <Typography variant="subtitle1">
                - Only post content that relates to the category
              </Typography>
              <Typography variant="subtitle1">
                - No NSFW posts allowed
              </Typography>
              <Typography variant="subtitle1">
                - Spamming posts will get banned from the site
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item lg={12}>
          {loading ? (
            <LinearProgress variant="primary" />
          ) : (
            <form onSubmit={(e) => submitDiscussion(e)}>
              <Grid container alignItems="center" direction="row">
                <Grid item lg={12}>
                  {error && (
                    <Message
                      message="Error creating Discussion. Check all fields provided"
                      variant="error"
                      open={true}
                    />
                  )}
                  {success && (
                    <Message
                      message="Post successfully Created!!"
                      variant="success"
                      open={true}
                    />
                  )}
                  <TextField
                    className={classes.MuiTextField}
                    id="title"
                    label="Title"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>

                <Grid item lg={12}>
                  <TextField
                    className={classes.MuiTextField}
                    id="body-text"
                    label="Body"
                    type="text"
                    variant="outlined"
                    multiline
                    rows={7}
                    fullWidth
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    className={classes.MuiTextField}
                    id="badge"
                    label="Flair"
                    type="text"
                    variant="outlined"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <InputLabel
                    className={classes.MuiSelect}
                    id="select-category"
                  >
                    Category
                  </InputLabel>
                  <Select
                    labelId="select-category"
                    value={category}
                    className={classes.MuiSelect}
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Music Theory">Music Theory</MenuItem>
                    <MenuItem value="Instrument Talk">Instrument Talk</MenuItem>
                    <MenuItem value="New Music">New Music</MenuItem>
                  </Select>
                </Grid>

                <Grid item lg={12}>
                  <Button
                    className={classes.MuiButton}
                    variant="outlined"
                    fullWidth
                    type="submit"
                  >
                    Post Discussion
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePost;
