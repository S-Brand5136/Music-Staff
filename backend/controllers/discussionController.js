import asyncHandler from "express-async-handler";
import Discussion from "../models/discussionModel.js";
import Profile from "../models/profileModel.js";

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
      badge: discussion.badge,
      comments: discussion.comments,
      numComments: discussion.numComments,
    });
  } else {
    res.status(500);
    throw new Error("No Discussion has been found");
  }
});

// @desc    Get all discussions
// @route   GET api/discussions
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
  const { text, title, category, badge } = req.body;

  const discussion = new Discussion({
    user: req.user,
    postedBy: req.user.name,
    text,
    title,
    category,
    comments: [],
    badge,
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
  const { text, title, category, badge } = req.body;

  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    discussion.text = text;
    discussion.title = title;
    discussion.category = category;
    discussion.badge = badge;

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

// @desc    Post a comment
// @route   Post api/discussion/:id/comments
// @access  private
const createDiscussionComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const profile = await Profile.findOne({ user: req.user._id });

  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    const comment = {
      user: req.user._id,
      text,
      name: req.user.name,
      avatar: profile.avatar,
    };

    discussion.comments.push(comment);
    discussion.numComments = discussion.comments.length;

    await discussion.save();
    res.status(201).json({ message: "Comment posted" });
  } else {
    res.status(500);
    throw new Error("Error in Comment Creation");
  }
});

// @desc    Delete a comment
// @route   Delete api/discussion/:id/comments/:commentid
// @access  private
const deleteDiscussionComment = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    const removeIndex = discussion.comments.findIndex(
      (comment) => comment.id === req.params.commentid
    );
    discussion.comments.splice(removeIndex, 1);

    await discussion.save();
    res.status(201).json({ message: "Comment deleted" });
  } else {
    res.status(500);
    throw new Error("Error in Comment Deletion");
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
  createDiscussionComment,
  deleteDiscussionComment,
};
