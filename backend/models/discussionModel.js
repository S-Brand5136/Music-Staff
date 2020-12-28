import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    flag: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const discussionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    avatar: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
    },
    comments: [commentSchema],
    numComments: {
      type: Number,
      default: 0,
    },
    flag: {
      type: Number,
      default: 0,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

export default Discussion;
