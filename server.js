const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRouter = require('./routes/Post_Router');
const userRouter = require('./routes/User_Router');
const app = express();
const port = 8080;
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

//Mongo DB Connection
mongoose.connect('mongodb://localhost:27017/BlogApp') //moved to env file
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
