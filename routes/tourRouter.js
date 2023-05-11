import express from "express";
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
} from "../controllers/tourController.js";
// import { admin, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// GET /tours
router.get("/", getAllTours);

// POST /tours
router.post("/", createTour);

// GET /tours/:tourId
router.get("/:tourId", getTourById);

// PUT /tours/:tourId
router.put("/:tourId", updateTour);

// DELETE /tours/:tourId
router.delete("/:tourId", deleteTour);

export default router;
