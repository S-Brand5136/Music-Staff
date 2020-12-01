import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const discussionSchema = mongoose.Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          Ref: "User",
        },
      },
    ],
    dislikes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          Ref: "User",
        },
      },
    ],
    comments: [commentSchema],
    numComments: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

export default Discussion;
