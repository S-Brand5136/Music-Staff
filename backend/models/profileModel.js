import mongoose, { Schema } from "mongoose";

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    avatar: {
      type: String,
    },
    discussions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    instrumentsLearned: [
      {
        type: String,
      },
    ],
    bio: {
      Type: String,
    },
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
