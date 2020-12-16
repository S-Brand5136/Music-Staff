import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDiscussion } from "../actions/discussionActions";

// MaterialUI Imports
import {
  Button,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  makeStyles,
  Typography,
  TextField,
  Select,
  Paper,
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
  },
  MuiSelect: {
    position: "relative",
    top: ".5rem",
    left: "5rem",
    width: "10rem",
  },
}));

const CreatePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [badge, setBadge] = useState("");
  const [category, setCategory] = useState("General");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const submitDiscussion = (e) => {
    e.preventDefault();
    dispatch(createDiscussion(title, body, badge, category));
  };

  return (
    <Box>
      <Grid container direction="row" spacing={5}>
        <Grid item lg={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xl={12} xs={12} md={8}>
              <Typography variant="h3">Create a new Discussion</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{ marginTop: "5rem" }} lg={6}>
          <Paper
            variant="outlined"
            elementType="div"
            elevation={3}
            className={classes.MuiPaper}
          >
            <form onSubmit={(e) => submitDiscussion(e)}>
              <Grid container alignItems="center" direction="row">
                <Grid item lg={12}>
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
                <Grid item lg={6}>
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
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Post Discussion
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item lg={6} style={{ marginTop: "5rem" }}>
          <Paper className={classes.MuiPaper}>
            <Typography className={classes.MuiTypography}>
              Be sure to Check the rules before posting!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePost;
