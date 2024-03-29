import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiscussionById, setCategory } from "../actions/discussionActions";
import DiscussPageItem from "../components/DiscussPageItem";
import Message from "../components/Message";

// MaterialUI imports
import {
  Badge,
  Breadcrumbs,
  Box,
  Divider,
  Grid,
  makeStyles,
  LinearProgress,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  AddMargin: {
    marginTop: "3rem",
  },
  boxStyling: {
    marginTop: "5rem",
    [theme.breakpoints.only("lg")]: {
      paddingLeft: "20rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0rem",
    },
  },
}));

const DiscussionPage = ({ match }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const deleteComment = useSelector((state) => state.deleteComment);
  const { success, loading: deleteLoader } = deleteComment;

  const createComment = useSelector((state) => state.createComment);
  const {
    success: createCommentSuccess,
    error: createCommentError,
  } = createComment;

  useEffect(() => {
    (async function getDetails() {
      await dispatch(getDiscussionById(match.params.id));
    })();
  }, [dispatch, match.params.id, success, createCommentSuccess]);

  const discussion = useSelector((state) => state.discussion);
  const { loading, discussion: discussItem } = discussion;

  const category = useSelector((state) => state.category);
  const { category: prevCategory } = category;

  return (
    <Box className={classes.boxStyling}>
      {loading || deleteLoader ? (
        <LinearProgress color="primary" />
      ) : (
        <Grid
          container
          style={{ marginLeft: "1rem", paddingRight: "2rem" }}
          direction="row"
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h3" className={classes.MuiTypography}>
              {discussItem.category} - {discussItem.title}{" "}
              {discussItem.badge && <Badge color="primary"></Badge>}
            </Typography>
            {createCommentError && (
              <Message
                message="Failed to post comment"
                variant="error"
                open={true}
              />
            )}
            {success && (
              <Message
                variant="success"
                message={"Comment removed"}
                open={true}
              />
            )}
            <Divider />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/" onClick={() => dispatch(setCategory("General"))}>
                HomePage
              </Link>
              /<Link to={`/`}>{prevCategory}</Link>
            </Breadcrumbs>
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
            md={12}
            className={classes.AddMargin}
          >
            <DiscussPageItem data={discussItem} OGpost={true} />
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item lg={12} className={classes.AddMargin}>
              {!loading &&
              discussItem.comments !== undefined &&
              discussItem.comments.length > 0 ? (
                discussItem.comments.map((item) =>
                  item.flag > 0 ? (
                    ""
                  ) : (
                    <div key={item._id}>
                      <DiscussPageItem
                        data={item}
                        discussionId={discussItem._id}
                      />
                    </div>
                  )
                )
              ) : (
                <Grid item lg={12}>
                  <Typography
                    className={classes.MuiTypography}
                    variant="h5"
                    align="center"
                  >
                    Be the first to leave a comment!
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DiscussionPage;
