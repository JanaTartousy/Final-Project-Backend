import express from "express";
import {
  getAllAdmins,
  createAdmin,
  addAdmin,
  addSuperAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  login,
  logout,
  register,
} from "../controllers/adminController.js";

const router = express.Router();

// GET /admins
router.get("/", getAllAdmins);

// POST /admins
router.post("/", createAdmin);

// add a new admin account
router.post("/add-admin", addAdmin);

// add a new super admin account
router.post("/add-super-admin", addSuperAdmin);

// GET /admins/:adminId
router.get("/:adminId", getAdminById);

// PUT /admins/:adminId
router.put("/:adminId", updateAdmin);

// DELETE /admins/:adminId
router.delete("/:adminId", deleteAdmin);

// register a new admin account
router.post("/register", register);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

export default router;
