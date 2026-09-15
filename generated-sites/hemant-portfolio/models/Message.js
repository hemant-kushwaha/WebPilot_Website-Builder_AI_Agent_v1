const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
