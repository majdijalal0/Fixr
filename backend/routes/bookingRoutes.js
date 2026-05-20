const express = require('express');
const router = express.Router();
const {
    createBooking,
    getCustomerBookings,
    getWorkerBookings,
    updateBookingStatus
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createBooking);
router.get('/customer', getCustomerBookings);
router.get('/worker', getWorkerBookings);
router.put('/:id/status', updateBookingStatus);

module.exports = router;
