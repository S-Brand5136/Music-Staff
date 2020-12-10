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
} from "../controllers/discussionController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getAllDiscussions).put(protect, postDiscussion);
router.route("/:id/comments").post(protect, createDiscussionComment);
router.route("/cat/:category").get(getDiscussionsByCategory);
router.route("/:search").get(getSearchedDiscussions);
router
  .route("/:id/comments/:commentid")
  .delete(protect, deleteDiscussionComment);
router
  .route("/:id")
  .get(getDiscussionById)
  .put(protect, updateDiscussion)
  .delete(protect, deleteDiscussion);

export default router;
