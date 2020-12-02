import asyncHandler from "express-async-handler";
import Discussion from "../models/discussionModel.js";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

// @desc    Get discussion by ID
// @route   GET api/discussion/:id
// @access  public
const getDiscussionById = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findOne({
    discussion: req.params.discussion_id,
  });

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

// @desc    Post a discussion
// @route   Post api/discussion
// @access  private
const postDiscussion = asyncHandler(async (req, res) => {
  const { text, title, category } = req.body;

  const discussion = new Discussion({
    postedBy: req.user,
    text,
    title,
    category,
    comments: [],
  });

  if (discussion) {
    const createdDiscussion = await discussion.save();
    return res.status(201).json(createdDiscussion);
  } else {
    res.status(500);
    throw new Error("Error in Discussion Creation");
  }
});

// @desc    Update a discussion
// @route   Put api/discussion/:id
// @access  private
const updateDiscussion = asyncHandler(async (req, res) => {
  const { text, title, category } = req.body;

  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    discussion.text = text;
    discussion.title = title;
    discussion.category = category;

    const updatedDiscussion = await discussion.save();
    return res.status(201).json(updatedDiscussion);
  } else {
    res.status(500);
    throw new Error("Error in Discussion Update");
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

// @desc    Put Like or unLike
// @route   Put api/discussion/:id
// @access  private
const likeDiscussion = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findOne({
    discussion: req.params.discussion_id,
  });

  if (
    discussion.likes.filter(
      (like) => like.user.toString() === req.user._id.toString()
    ).length > 0
  ) {
    const removeIndex = discussion.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id.toString());

    discussion.likes.splice(removeIndex, 1);

    await discussion.save();

    return res.json(discussion.likes);
  } else {
    discussion.likes.unshift({ user: req.user._id });

    await discussion.save();

    res.json(discussion.likes);
  }
  if (!discussion) {
    res.status(500);
    throw new Error("Failed to like Discussion");
  }
});

// @desc    Put Dislike or unDislike
// @route   Put api/discussion/:id
// @access  private
const dislikeDiscussion = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findOne({
    discussion: req.params.discussion_id,
  });
  if (
    discussion.dislikes.filter(
      (dislike) => dislike.user.toString() === req.user._id.toString()
    ).length > 0
  ) {
    const removeIndex = discussion.dislikes
      .map((dislike) => dislike.user.toString())
      .indexOf(req.user.id.toString());

    discussion.dislikes.splice(removeIndex, 1);

    await discussion.save();

    res.json(discussion.dislikes);
  } else {
    discussion.dislikes.unshift({ user: req.user._id });

    await discussion.save();
    res.json(discussion.dislikes);
  }

  if (!discussion) {
    res.status(500);
    throw new Error("Failed to like Discussion");
  }
});

// @desc    Delete a discussion
// @route   Delete api/discussion/:id
// @access  private
const deleteDiscussion = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findOne({
    discussion: req.params.discussion_id,
  });

  if (discussion.postedBy.toString() == req.user._id) {
    await Discussion.deleteOne(discussion);

    return res.json({ msg: "Discussion Deleted " });
  } else {
    res.status(500);
    throw new Error("Failed to Delete");
  }
});

export {
  getDiscussionById,
  getAllDiscussions,
  getDiscussionsByCategory,
  postDiscussion,
  likeDiscussion,
  dislikeDiscussion,
  deleteDiscussion,
  updateDiscussion,
};

// TODO add post comment and delete comment controllers, add checks for likes and dislikes
