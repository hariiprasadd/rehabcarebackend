const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const blogRouter = require('./routes/blogRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const appointmentRouter = require('./routes/appointmentRoutes');
const contactRouter = require('./routes/contactRoutes');
const metaRouter = require('./routes/metaRoutes');
const galleryRouter = require('./routes/galleryRoutes');
const iconRouter = require('./routes/iconRoutes');
const studioRouter = require('./routes/studioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Connect to MongoDB with extended timeout
mongoose.connect('mongodb+srv://ppreddyseniorcare:dpImwq0IBO9PAf1k@cluster0.ggvhz.mongodb.net/Rehab?retryWrites=true&w=majority&appName=Cluster0', {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', blogRouter);
app.use('/api', serviceRouter);
app.use('/api', appointmentRouter);
app.use('/api', contactRouter);
app.use('/api', metaRouter);
app.use('/api', galleryRouter);
app.use('/api', iconRouter);
app.use('/api', studioRouter);

// Serve static images
app.use('/api/images', express.static('images'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
