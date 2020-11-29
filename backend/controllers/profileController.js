import asyncHandler from "express-async-handler";
import Profile from "../models/profileModel.js";

// @desc    Get user Profile
// @route   GET api/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });

  if (profile) {
    res.json({
      _id: profile._id,
      avatar: profile.avatar,
      discussions: profile.discussions,
      comments: profile.discussions,
      bio: profile.bio,
      social: profile.social,
    });
  }
  if (!profile) {
    res.json({ msg: "No Profile has been created" });
  } else {
    res.status(500);
    throw new Error("Server Error");
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

export { getUserProfile, updateUserProfile };
