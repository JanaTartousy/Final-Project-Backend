import express from "express";
import {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  login,
  logout,
  register,
} from "../controllers/adminController.js";
import { admin, superAdmin } from "../middleware/auth.js";
const router = express.Router();

// GET /admins
router.get("/", admin, superAdmin, getAllAdmins);

// GET /admins/:adminId
router.get("/:adminId", admin, superAdmin, getAdminById);

// PUT /admins/:adminId
router.put("/:adminId", admin, superAdmin, updateAdmin);

// DELETE /admins/:adminId
router.delete("/:adminId", admin, superAdmin, deleteAdmin);

// register a new admin account
router.post("/register", register);

// login
router.post("/login", login);

// logout
router.post("/logout", admin, superAdmin, logout);

export default router;
