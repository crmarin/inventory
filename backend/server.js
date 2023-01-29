import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes/api/index.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

// Init Middleware
app.use(express.json());

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
