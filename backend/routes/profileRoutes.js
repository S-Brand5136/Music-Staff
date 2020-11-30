import express from "express";
const router = express.Router();
import {
  getLoggedInProfile,
  updateUserProfile,
  getUserProfile,
  deleteUser,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getLoggedInProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser);
router.route("/user/:id").get(getUserProfile);

export default router;
