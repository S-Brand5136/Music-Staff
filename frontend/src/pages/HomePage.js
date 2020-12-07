import React, { useEffect } from "react";
import PostListItem from "../components/PostListItem";
import { useSelector, useDispatch } from "react-redux";
import { getDiscussions } from "../actions/discussionActions";

// MaterialUI Imports
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  LinearProgress,
  List,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Search, PostAdd } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#8D8C8A",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "white",
  },
  iconButton: {
    padding: 10,
    color: "white",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  MuiListItem: {
    color: "white",
    margin: "1rem",
  },
  MuiTypography: {
    color: "white",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const discussions = useSelector((state) => state.discussions);
  const { discussionList, loading } = discussions;

  useEffect(() => {}, [dispatch]);
  return (
    <Box>
      <Grid container direction="row">
        <Grid item lg={12}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-end"
            spacing={5}
          >
            <Grid item xl={7} xs={12} md={8}>
              <Typography variant="h3" className={classes.MuiTypography}>
                General
              </Typography>
            </Grid>

            <Grid item xl={4} xs={12} md={8}>
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Search Forum..."
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton
                  type="submit"
                  aria-label="search"
                  className={classes.iconButton}
                >
                  <Search />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xl={11} xs={12} md={8}>
              <Button style={{ float: "right" }} variant="contained">
                <PostAdd /> New Post
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xl={12}>
          <Grid container direction="row">
            <Grid item>
              <Typography className={classes.MuiTypography} variant="subtitle1">
                Discussions
              </Typography>
            </Grid>

            <Grid item xl={12} lg={12}>
              {loading ? (
                <LinearProgress color="primary" />
              ) : (
                <List>
                  <Divider />
                  {discussionList.map((item) => (
                    <>
                      <PostListItem discussion={item} />
                      <Divider />
                    </>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
