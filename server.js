const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRouter = require('./routes/Post_Router');
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use('/posts', postRouter);
<<<<<<< Updated upstream
mongoose.connect('mongodb://localhost:27017/BlogApp')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
=======

//Mongo DB Connection
mongoose.connect('mongodb://localhost:27017/BlogApp') //move to env file
  .then(() => {console.log('MongoDB connected...')})
  .catch(err => {console.log(err)});
>>>>>>> Stashed changes
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
