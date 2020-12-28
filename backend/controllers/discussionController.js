import asyncHandler from "express-async-handler";
import Discussion from "../models/discussionModel.js";
import Profile from "../models/profileModel.js";

// @desc    Get discussion by ID
// @route   GET api/discussion/:id
// @access  public
const getDiscussionById = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    return res.json(discussion);
  } else {
    res.status(500);
    throw new Error("No Discussion has been found");
  }
});

// @desc    Get all discussions
// @route   GET api/discussions
// @access  public
const getAllDiscussions = asyncHandler(async (req, res) => {
  const discussions = await Discussion.find({})
    .sort({ timestamp: -1 })
    .exec((err, res) => {
      if (discussions) {
        return res.json(discussions);
      } else {
        res.status(500);
        throw new Error("Discussions not found");
      }
    });
});

// @desc    Get searched discussions
// @route   GET api/discussions/:search
// @access  public
const getSearchedDiscussions = asyncHandler(async (req, res) => {
  const search = req.params.search;

  const discussions = await Discussion.find({
    title: { $regex: search },
  });

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

  const profile = await Profile.findOne({ user: req.user._id });

  const discussion = new Discussion({
    user: req.user,
    postedBy: req.user.name,
    avatar: profile.avatar,
    text,
    title,
    category,
    comments: [],
    badge,
  });

  if (discussion) {
    const createdDiscussion = await discussion.save();
    profile.discussions.unshift(discussion);
    profile.save();
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
// @route   GET api/discussion/cat/:category
// @access  public
const getDiscussionsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;

  const discussions = await Discussion.find({
    category: category,
  }).sort({ _id: -1 });

  if (discussions) {
    return res.json(discussions);
  } else {
    res.status(500);
    throw new Error("Discussions not found");
  }
});

// @desc    Delete a discussion
// @route   Delete api/discussion/:id
// @access  private
const deleteDiscussion = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);

  if (discussion.user.toString() === req.user._id.toString()) {
    const profile = await Profile.findOne({ user: req.user._id });

    const index = profile.discussions.indexOf(
      (disc) => disc._id === discussion._id
    );
    profile.discussions.splice(index, 1);

    await Discussion.deleteOne(discussion);
    await profile.save();

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
      postedBy: req.user.name,
      avatar: profile.avatar,
    };

    profile.comments.push(comment);
    discussion.comments.push(comment);
    discussion.numComments = discussion.comments.length;

    await profile.save();
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
  const profile = await Profile.findById({ user: req.user._id });

  if (discussion) {
    const removeIndex = discussion.comments.findIndex(
      (comment) => comment.id === req.params.commentid
    );
    const proRemoveIndex = profile.comments.findIndex(
      (comment) => comment.id === req.params.commentid
    );
    discussion.comments.splice(removeIndex, 1);
    discussion.numComments = discussion.comments.length;

    profile.comments.splice(proRemoveIndex, 1);

    await profile.save();
    await discussion.save();
    res.status(201).json({ message: "Comment deleted" });
  } else {
    res.status(500);
    throw new Error("Error in Comment Deletion");
  }
});

// @desc    Flag a comment
// @route   PUT api/discussion/:id/flag/comment/:commentid
// @access  private
const flagDiscussionComment = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    const flagIndex = discussion.comments.findIndex(
      (comment) => comment.id === req.params.commentid
    );

    discussion.comments[flagIndex].flag += 1;

    await discussion.save();
    res.status(201).json({ message: "Comment Flagged" });
  } else {
    res.status(500);
    throw new Error("Error in Comment flagging");
  }
});

// @desc    Flag a discussion
// @route   PUT api/discussion/flag/:id
// @access  private
const flagDiscussion = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    discussion.flag += 1;

    await discussion.save();
    res.status(201).json({ message: "Discussion Flagged" });
  } else {
    res.status(500);
    throw new Error("Error in Discussion flagging");
  }
});

export {
  getDiscussionById,
  getAllDiscussions,
  getDiscussionsByCategory,
  getSearchedDiscussions,
  postDiscussion,
  deleteDiscussion,
  updateDiscussion,
  createDiscussionComment,
  deleteDiscussionComment,
  flagDiscussionComment,
  flagDiscussion,
};
