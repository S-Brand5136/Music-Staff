import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getProfileById } from "../actions/profileActions";
import { getDiscussionById } from "../actions/discussionActions";

// MaterialUI imports

const DiscussionPage = ({ history, match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscussionById(match.params.id));
  }, [dispatch, match]);

  return <div></div>;
};

export default DiscussionPage;
