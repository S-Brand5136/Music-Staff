import React, { useState, useEffect } from "react";
import DiscussionListItem from "../components/DiscussionListItem";
import { useSelector, useDispatch } from "react-redux";
import {
  getDiscussionsBySearch,
  getDiscussionsByCategory,
} from "../actions/discussionActions";

// MaterialUI Imports
import {
  Box,
  Button,
  Divider,
  Grid,
  Hidden,
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
    backgroundColor: "#363538",
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
}));

const HomePage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const discussions = useSelector((state) => state.discussions);
  const { discussionList, loading } = discussions;

  const category = useSelector((state) => state.category);
  const { category: catTitle, loading: catloading } = category;

  const deleteDiscussion = useSelector((state) => state.deleteDiscussion);
  const { success } = deleteDiscussion;

  const createDiscussion = useSelector((state) => state.createDiscussion);
  const { success: createSuccess } = createDiscussion;

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getDiscussionsBySearch(searchTerm));
    dispatch(getDiscussionsByCategory(catTitle));
  };

  useEffect(() => {
    if (success || createSuccess || catloading) {
      dispatch(getDiscussionsByCategory(catTitle));
    }
  }, [success, createSuccess]);

  return (
    <Box>
      <Grid container direction="row">
        <Grid item lg={12} xl={12}>
          <Grid
            container
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={5}
          >
            <Grid item xl={12} lg={12} xs={12} md={8}>
              <Hidden smUp>
                <Typography
                  style={{ marginTop: "2rem", marginLeft: "2rem" }}
                  variant="h3"
                  className={classes.MuiTypography}
                >
                  {catloading ? "...." : catTitle.toString()}
                </Typography>
              </Hidden>
              <Hidden mdDown>
                <Typography
                  style={{ marginTop: "5rem", marginLeft: "2rem" }}
                  variant="h3"
                  className={classes.MuiTypography}
                >
                  {catloading ? "...." : catTitle.toString()}
                </Typography>
                <Divider />
              </Hidden>
            </Grid>

            <Grid item lg={4} xs={11} md={8}>
              <Paper
                component="form"
                onSubmit={(e) => searchHandler(e)}
                className={classes.root}
              >
                <InputBase
                  className={classes.input}
                  placeholder="Search Forum..."
                  inputProps={{ "aria-label": "search google maps" }}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
            <Grid item xl={12} xs={10} md={8}>
              <Button
                style={{ float: "right" }}
                onClick={() => history.push("/createPost")}
                variant="outlined"
              >
                <PostAdd /> New Post
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xl={12} lg={12} xs={12}>
          <Grid container direction="row">
            <Grid item xs={4}>
              <Typography
                align="center"
                className={classes.MuiTypography}
                variant="subtitle1"
              >
                Discussions
              </Typography>
            </Grid>

            <Grid item xl={12} lg={12} xs={12}>
              {loading ? (
                <LinearProgress color="primary" />
              ) : (
                <List>
                  <Divider />
                  {discussionList &&
                    discussionList.map((item) => (
                      <div key={item}>
                        {!item.archived && (
                          <>
                            <DiscussionListItem discussion={item} />
                            <Divider />
                          </>
                        )}
                      </div>
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
