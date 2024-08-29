const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');
const postSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: uuidv4
    },
    title:{
        type: String,
        required: true,
        maxlength: 20 
    },
    description:{
        type: String,
        required: true,
        maxlength: 600
    },
    created_At:{
        type: Date,
        default: Date.now,
        immutable: true
    },
    updated_At:{
        type: Date,
        default: Date.now,
    },
    author:{
        //type: mongoose.Schema.Types.ObjectId,
        type: String,
        //ref: 'User',
        required: true
    }
},
{
    timestamps: { createdAt: 'created_At', updatedAt: 'updated_At'}
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;


