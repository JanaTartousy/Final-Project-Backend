import express from 'express';
import {
	getAllFeedbacks,
	createFeedback,
	getFeedbackById,
	updateFeedback,
	deleteFeedback,
} from '../controllers/feedbackController.js';
// import { admin, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// GET /feedbacks
router.get('/', getAllFeedbacks);

// POST /feedbacks
router.post('/', createFeedback);

// GET /feedbacks/:feedbackId
router.get('/:feedbackId', getFeedbackById);

// PUT /feedbacks/:feedbackId
router.put('/:feedbackId',  updateFeedback);

// DELETE /feedbacks/:feedbackId
router.delete('/:feedbackId', deleteFeedback);

export default router;
