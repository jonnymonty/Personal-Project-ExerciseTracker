const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Helps connect to MongoDB database

// Allows the environment variables in the dotenv file
require('dotenv').config();

// Creates the express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse Json "sending and receiving json"

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Starts the server and listens on a certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});