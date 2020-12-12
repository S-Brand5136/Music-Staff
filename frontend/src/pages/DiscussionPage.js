import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getProfileById } from "../actions/profileActions";
import { getDiscussionById } from "../actions/discussionActions";

// MaterialUI imports
import {
  Badge,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";

const DiscussionPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const discussion = useSelector((state) => state.discussion);
  const { loading, discussion: discussItem, error } = discussion;

  const originalPoster = useSelector((state) => state.userProfileById);
  const {
    loading: opLoading,
    userProfileById,
    error: opError,
  } = originalPoster;

  useEffect(() => {
    (async function getDetails() {
      await dispatch(getDiscussionById(match.params.id));
    })();
  }, [dispatch, match.params.id]);

  return (
    <Box>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <Grid container direction="row">
          <Grid item lg={12}>
            <Typography variant="h3">
              {discussItem.category} - {discussItem.title}{" "}
              {discussItem.badge && <Badge color="primary"></Badge>}
            </Typography>
            <Divider />
          </Grid>
          <Grid item lg={12}>
            <ListItem>
              <ListItemAvatar></ListItemAvatar>
              <ListItemText></ListItemText>
            </ListItem>
          </Grid>
          <Grid container>
            <Grid item></Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DiscussionPage;
