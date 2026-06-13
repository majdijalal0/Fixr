const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config(); 

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

const connectdb = require('./config/dbconnect.js');
const authRoutes = require('./routes/authRoutes');
const workerRoutes = require('./routes/workerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

connectdb();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})

module.exports = app;