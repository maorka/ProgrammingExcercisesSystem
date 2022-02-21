let mongoose = require('mongoose')//import mongoose package
// require('./db')

const schema = new mongoose.Schema({     //new Schama
    name: {
        type: String,
        required: true,//
        minlength: 2,//minimal length of name,2 characters 
        trim: true//cut-off spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,//
        lowercase: true,
        //match:-> obligate the users to enter email pattern-> user@email.com
        match:/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ 
    },
    password: {
        type: String,
        required: true,
        select: false      //select=false means do not return the pass from get request
    },
    user_type: {
        type: String,
        enum: ["user", "editor", "admin"],
        default:"user",
        required: true
    },
    profile_img: {
        type: String,
    },
    lastSeen: {
        type: Date,
        default: Date.now

    }



})

module.exports = mongoose.model('user', schema)//create Schema/collection with new name-user


