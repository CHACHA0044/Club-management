require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/auth');
const eventRoutes = require("./routes/events");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);

// Test API
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
