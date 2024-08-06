const mongoose = require('mongoose');
//const validator = require('validator');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //validate: [validator.isEmail, 'Invalid email']
    },
    phoneNum: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});
const User = mongoose.model('User', userSchema);
module.exports=User;