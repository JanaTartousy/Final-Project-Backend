import express from 'express';
import {
	getAllSocialMedias,
	createSocialMedia,
	getSocialMediaById,
	updateSocialMedia,
	deleteSocialMedia,
} from '../controllers/socialmediaController.js';
// import { admin, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// GET /socialmedia
router.get('/', getAllSocialMedias);

// POST /socialmedia
router.post('/', createSocialMedia);

// GET /socialmedia/:socialmediaId
router.get('/:socialmediaId', getSocialMediaById);

// PUT /socialmedia/:socialmediaId
router.put('/:socialmediaId',  updateSocialMedia);

// DELETE /socialmedia/:socialmediaId
router.delete('/:socialmediaId', deleteSocialMedia);

export default router;
