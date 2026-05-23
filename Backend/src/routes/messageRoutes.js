import express from "express";
import {
  getOrCreateConversation,
  getMyConversations,
  getMessages,
  sendMessage,
  resolveConversation,
} from "../controllers/messageController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",                    requireAuth, getOrCreateConversation);
router.get("/",                     requireAuth, getMyConversations);
router.get("/:id/messages",         requireAuth, getMessages);
router.post("/:id/messages",        requireAuth, sendMessage);
router.patch("/:id/resolve",        requireAuth, resolveConversation);

export default router;