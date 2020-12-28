import asyncHandler from "express-async-handler";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

// @desc    Get logged in user Profile
// @route   GET api/profile
// @access  Private
const getLoggedInProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });

  if (profile) {
    return res.json({
      _id: profile._id,
      avatar: profile.avatar,
      discussions: profile.discussions,
      comments: profile.comments,
      bio: profile.bio,
      social: profile.social,
    });
  } else {
    res.status(500);
    throw new Error("No Profile has been found");
  }
});

// @desc    Get users profile by id
// @route   GET api/profile/user/:id
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    user: req.params.id,
  }).populate("user", ["name"]);

  if (profile) {
    return res.json(profile);
  } else {
    res.status(500);
    throw new Error("No Profile has been found");
  }
});

// @desc    Update user Profile
// @route   PUT api/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  const { youtube, twitter, instagram, linkedin, avatar, bio } = req.body;

  if (profile) {
    if (avatar) profile.avatar = avatar;
    if (bio) profile.bio = bio;
    if (youtube) profile.social.youtube = youtube;
    if (twitter) profile.social.twitter = twitter;
    if (linkedin) profile.social.linkedin = linkedin;
    if (instagram) profile.social.instagram = instagram;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } else {
    const profile = new Profile({
      user: req.user._id,
      bio: "Introduce yourself here!",
      avatar: "P",
      discussions: [],
      comments: [],
    });

    profile.social = {};
    if (youtube) profile.social.youtube = youtube || "";
    if (twitter) profile.social.twitter = twitter || "";
    if (linkedin) profile.social.linkedin = linkedin || "";
    if (instagram) profile.social.instagram = instagram || "";

    const createdProfile = await profile.save();
    res.json(createdProfile);
  }
});

// @desc    delete logged in user Profile
// @route   DELETE api/profile
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  const user = await User.findOne({ user: req.user._id });

  if (profile) {
    await Profile.deleteOne(profile);

    await User.deleteOne(user);

    // TODO: Add delete discussions
    res.json({ msg: "User Deleted " });
  } else {
    res.status(500);
    throw new Error("Unable to delete");
  }
});

export { getLoggedInProfile, updateUserProfile, getUserProfile, deleteUser };
