import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getProfileById } from "../actions/profileActions";
import { getDiscussionById } from "../actions/discussionActions";

// MaterialUI imports
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";

const DiscussionPage = ({ history, match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscussionById(match.params.id));
  }, [dispatch, match]);

  const discussion = useSelector((state) => state.discussion);
  const { loading, discussion: discussItem, error } = discussion;

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
          <Grid item></Grid>
          <Grid item></Grid>
          <Grid item></Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DiscussionPage;
