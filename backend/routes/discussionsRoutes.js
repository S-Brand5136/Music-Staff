import express from "express";
const router = express.Router();
import {
  getAllDiscussions,
  getDiscussionById,
  getDiscussionsByCategory,
  dislikeDiscussion,
  likeDiscussion,
  deleteDiscussion,
  updateDiscussion,
  postDiscussion,
} from "../controllers/discussionController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getAllDiscussions).put(protect, postDiscussion);
router
  .route("/:id")
  .get(getDiscussionById)
  .put(protect, updateDiscussion)
  .delete(protect, deleteDiscussion);
router.route("/like/:id").put(protect, likeDiscussion);
router.route("/dislike/:id").put(protect, dislikeDiscussion);
router.route("/:category").get(getDiscussionsByCategory);

export default router;
