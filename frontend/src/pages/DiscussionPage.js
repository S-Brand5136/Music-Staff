import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscussionById } from "../actions/discussionActions";
import DiscussPageItem from "../components/DiscussPageItem";
import Message from "../components/Message";

// MaterialUI imports
import {
  Badge,
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
}));

const DiscussionPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const deleteComment = useSelector((state) => state.deleteComment);
  const { success, loading: deleteLoader, reload } = deleteComment;

  const createComment = useSelector((state) => state.createComment);
  const { success: createCommentSuccess } = createComment;

  useEffect(() => {
    (async function getDetails() {
      await dispatch(getDiscussionById(match.params.id));
    })();
  }, [dispatch, match.params.id, success, createCommentSuccess]);

  const discussion = useSelector((state) => state.discussion);
  const { loading, discussion: discussItem, error } = discussion;

  return (
    <Box>
      {loading || deleteLoader ? (
        <LinearProgress color="primary" />
      ) : (
        <Grid container direction="row">
          <Grid item lg={12}>
            <Typography variant="h3" className={classes.MuiTypography}>
              {discussItem.category} - {discussItem.title}{" "}
              {discussItem.badge && <Badge color="primary"></Badge>}
            </Typography>
            {success && (
              <Message
                variant="success"
                message={"Comment removed"}
                open={true}
              />
            )}
            <Divider />
          </Grid>
          <Grid item lg={12} className={classes.AddMargin}>
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
                    <DiscussPageItem
                      data={item}
                      discussionId={discussItem._id}
                    />
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
