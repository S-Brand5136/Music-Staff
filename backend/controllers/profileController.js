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
      comments: profile.discussions,
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
    profile: req.params.user_id,
  }).populate("user", ["bio", "avatar"]);

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

  if (profile) {
    profile.avatar = req.body.avatar || profile.avatar;
    profile.bio = req.body.bio || profile.bio;
    profile.social.youtube = req.body.youtube || profile.social.youtube;
    profile.social.twitter = req.body.twitter || profile.social.twitter;
    profile.social.instagram = req.body.instagram || profile.social.instagram;
    profile.social.linkedin = req.body.linkedin || profile.social.linkedin;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } else {
    const profile = new Profile({
      user: req.user._id,
      bio: req.body.bio,
      avatar: req.body.avatar,
      social: [
        { youtube: req.body.youtube },
        { twitter: req.body.twitter },
        { instagram: req.body.instagram },
        { linkedin: req.body.linkedin },
      ],
      discussions: [],
      comments: [],
    });

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
