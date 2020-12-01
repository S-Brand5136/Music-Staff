import asyncHandler from "express-async-handler";
import Discussion from "../models/discussionModel";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

// @desc    Post a discussion
// @route   Post api/discussion
// @access  private
const postDiscussion = asyncHandler(async (req, res) => {
  const {
    postedBy,
    text,
    title,
    category,
    likes,
    comments,
    numComments,
  } = req.body;

  const discussion = new Discussion({
    postedBy,
    text,
    title,
    category,
    likes,
    comments,
    numComments,
  });

  if (discussion) {
    const createdDiscussion = await discussion.save();
    return res.status(201).json(createdDiscussion);
  } else {
    res.status(500);
    throw new Error("Error in Discussion Creation");
  }
});

// @desc    Get discussion by ID
// @route   GET api/discussion/:id
// @access  public
const getDiscussionById = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findOne({ disccusion: req.params.id });

  if (discussion) {
    return res.json({
      _id: discussion._id,
      postedBy: discussion.postedBy,
      text: discussion.text,
      title: discussion.title,
      category: discussion.category,
      likes: discussion.likes,
      comments: discussion.comments,
      numComments: discussion.numComments,
    });
  } else {
    res.status(500);
    throw new Error("No Discussion has been found");
  }
});

// @desc    Get all discussions
// @route   GET api/discussion
// @access  public
const getAllDiscussions = asyncHandler(async (req, res) => {
  const discussions = await Discussion.find({});

  if (discussions) {
    return res.json(discussions);
  } else {
    res.status(500);
    throw new Error("Discussions not found");
  }
});

// @desc    Get discussion by category
// @route   GET api/discussion/:category
// @access  public
const getDiscussionsByCategory = asyncHandler(async (req, res) => {
  const discussions = await Discussion.find({ category: req.params.category });

  if (discussions) {
    return res.json(discussions);
  } else {
    res.status(500);
    throw new Error("Discussions not found");
  }
});

export {
  getDiscussionById,
  getAllDiscussions,
  getDiscussionsByCategory,
  postDiscussion,
};
