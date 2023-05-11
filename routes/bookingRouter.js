import express from 'express';
import {
	getAllBookings,
	createBooking,
	getBookingById,
	updateBooking,
	deleteBooking,
} from '../controllers/bookingController.js';
// import { admin, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// GET /bookings
router.get('/', getAllBookings);

// POST /bookings
router.post('/', createBooking);

// GET /bookings/:bookingId
router.get('/:bookingId', getBookingById);

// PUT /bookings/:bookingId
router.put('/:bookingId',  updateBooking);

// DELETE /bookings/:bookingId
router.delete('/:bookingId', deleteBooking);

export default router;
