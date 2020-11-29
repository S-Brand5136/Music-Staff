import mongoose from "mongoose";

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    bio: {
      type: String,
    },
    social: [
      {
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
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
