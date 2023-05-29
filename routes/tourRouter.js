import express from "express";
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
} from "../controllers/tourController.js";
import uploadImage from "../middleware/imagesUpload.js"
import { roleAccess, verifyUser } from "../middleware/auth.js";
// import { admin, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// GET /tours
router.get("/",  getAllTours);

// POST /tours
router.post("/",uploadImage('Tourimage'), createTour);

// GET /tours/:tourId
router.get("/:tourId", getTourById);

// PUT /tours/:tourId
router.put("/:tourId",uploadImage("Tourimage"), updateTour);

// DELETE /tours/:tourId
router.delete("/:tourId", deleteTour);

export default router;
