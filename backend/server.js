const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/api');
const auth = require('./middleware/auth');

const connectDB = require('./config/db');


require('dotenv').config();

const app = express();

connectDB();

app.use(cors());

// Init Middleware
app.use(express.json());
app.use(auth);

// Define Routes
app.use('/', routes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
