require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post-router'); 
const userRouter = require('./routes/user-router'); 
const app = express();
const port = process.env.PORT || 8080;
const mongodbUri = process.env.MONGODB_URI;
const multer = require('multer');
const path = require('path');

app.use(cors({ origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use('/users', userRouter); 
app.use('/posts', postRouter);

mongoose.connect(mongodbUri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});