import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    avatar: {
      type: String,
      required: true,
    },
    discussions: [],
    comments: [],
    bio: {
      type: String,
    },
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
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
