import express from "express";
const router = express.Router();
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
