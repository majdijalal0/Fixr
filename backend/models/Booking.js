const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Customer ID is required']
        },
        workerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Worker ID is required']
        },
        serviceType: {
            type: String,
            required: [true, 'Service type is required']
        },
        date: {
            type: Date,
            required: [true, 'Booking date is required']
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        notes: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
            default: 'pending'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
