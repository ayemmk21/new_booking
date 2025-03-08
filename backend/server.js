// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

// API endpoint to get bookings
app.get('/api/bookings', async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});

// API endpoint to create a booking
app.post('/api/bookings', async (req, res) => {
    const { name, email, date } = req.body;
    const newBooking = new Booking({ name, email, date });
    await newBooking.save();
    res.json(newBooking);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
