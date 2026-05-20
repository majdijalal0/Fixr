const Booking = require('../models/Booking');
const User = require('../models/User');

const createBooking = async (req, res) => {
    try {
        const { workerId, serviceType, date, address, notes } = req.body;
        const customerId = req.user.id;

        if (req.user.role !== 'customer') {
             return res.status(403).json({ message: 'Only customers can request a booking' });
        }

        const worker = await User.findById(workerId);
        if (!worker || worker.role !== 'worker') {
            return res.status(404).json({ message: 'Worker not found' });
        }

        const booking = await Booking.create({
            customerId,
            workerId,
            serviceType,
            date,
            address,
            notes
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};


const getCustomerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const bookings = await Booking.find({ customerId: req.user.id })
            .populate('workerId', 'name email workerProfile')
            .sort('-createdAt');
            
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};


const getWorkerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'worker') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const bookings = await Booking.find({ workerId: req.user.id })
            .populate('customerId', 'name email')
            .sort('-createdAt');

        res.status(200).json(bookings);
    } catch (error) {
         res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};


const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const bookingId = req.params.id;

        const validStatuses = ['pending', 'accepted', 'rejected', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
             return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.workerId.toString() !== req.user.id.toString() && req.user.role === 'worker') {
             return res.status(403).json({ message: 'Not authorized to update this booking' });
        }

        if (req.user.role === 'customer') {
             if (booking.customerId.toString() !== req.user.id.toString()) {
                  return res.status(403).json({ message: 'Not authorized to modify this booking' });
             }
             if (status !== 'cancelled') {
                  return res.status(403).json({ message: 'Customers can only cancel bookings' });
             }
        }

        booking.status = status;
        const updatedBooking = await booking.save();

        res.status(200).json(updatedBooking);

    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error: error.message });
    }
};

module.exports = {
    createBooking,
    getCustomerBookings,
    getWorkerBookings,
    updateBookingStatus
};
