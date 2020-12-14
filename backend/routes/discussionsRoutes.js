import express from "express";
const router = express.Router();
import {
  getAllDiscussions,
  getDiscussionById,
  getSearchedDiscussions,
  getDiscussionsByCategory,
  deleteDiscussion,
  updateDiscussion,
  postDiscussion,
  createDiscussionComment,
  deleteDiscussionComment,
  flagDiscussionComment,
  flagDiscussion,
} from "../controllers/discussionController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getAllDiscussions).put(protect, postDiscussion);
router.route("/:id/comments").post(protect, createDiscussionComment);
router.route("/cat/:category").get(getDiscussionsByCategory);
router.route("/search/:search").get(getSearchedDiscussions);
router
  .route("/:id/comments/:commentid")
  .delete(protect, deleteDiscussionComment);
router
  .route("/:id")
  .get(getDiscussionById)
  .put(protect, updateDiscussion)
  .delete(protect, deleteDiscussion);
router
  .route("/:id/flag/comment/:commentid")
  .put(protect, flagDiscussionComment);
router.route("/flag/:id").put(protect, flagDiscussion);

export default router;
