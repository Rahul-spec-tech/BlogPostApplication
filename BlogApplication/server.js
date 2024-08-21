require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post-router'); 
const userRouter = require('./routes/user-router'); 
const app = express();
const port = process.env.PORT;
const mongodbUri = process.env.MONGODB_URI;
app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter); 
app.use('/posts', postRouter); 
mongoose.connect(mongodbUri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
