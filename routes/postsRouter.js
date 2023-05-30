import express from 'express';
import {
	getAllPosts,
	createPost,
	getPostById,
	updatePost,
	deletePost,
} from '../controllers/postsController.js';
import uploadImage from '../middleware/imagesUpload.js';
// import { admin, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// GET /posts
router.get('/', getAllPosts);

// POST /posts
router.post('/', uploadImage('Postimage'), createPost);

// GET /posts/:postId
router.get('/:postId', getPostById);

// PUT /posts/:postId
router.put('/:postId', uploadImage('Postimage'), updatePost);

// DELETE /posts/:postId
router.delete('/:postId', deletePost);

export default router;
