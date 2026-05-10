import express from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  resolveItem,
  deleteItem,
} from "../controllers/itemController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",                getItems);
router.get("/:id",             getItemById);
router.post("/",               requireAuth, createItem);
router.patch("/:id",           requireAuth, updateItem);
router.patch("/:id/resolve",   requireAuth, resolveItem);
router.delete("/:id",          requireAuth, deleteItem);

export default router;