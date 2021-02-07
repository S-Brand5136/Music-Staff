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
    marginTop: "1rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1rem",
    },
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
  titleStyling: {
    marginTop: "5rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "2rem",
      marginLeft: "1rem",
    },
  },
  navGrid: {
    justify: "flex-end",
    alignItems: "flex-end",
    [theme.breakpoints.down("md")]: {
      justify: "flex-start",
      alignItems: "flex-start",
    },
    marginBottom: "2rem",
    marginLeft: "2rem",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
    },
  },
  boxStyling: {
    [theme.breakpoints.only("lg")]: {
      paddingLeft: "15rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0rem",
    },
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
    // eslint-disable-next-line
  }, [success, createSuccess]);

  return (
    <Box className={classes.boxStyling}>
      <Grid container direction="row">
        <Grid className={classes.navGrid} container>
          <Grid item className={classes.titleStyling} lg={12} xs={12}>
            <Typography variant="h3" className={classes.MuiTypography}>
              {catloading ? "...." : catTitle.toString()}
            </Typography>
            <Divider />
          </Grid>

          <Grid item container justify="flex-start" lg={10}>
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
          <Grid item lg={2}>
            <Button
              style={{ float: "right" }}
              onClick={() => history.push("/createPost")}
              variant="outlined"
            >
              <PostAdd /> New Post
            </Button>
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
                      <div key={item._id}>
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
