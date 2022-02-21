let mongoose = require('mongoose')//import mongoose package

const ExcerSchema = new mongoose.Schema({      //new Schama
    icon: {
        type: String
    },
    title: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: true,
        minlength: 2    //minimal length of name,1 characters 

    },
    status: {
        type: String,
        enum: ['draft', 'publish', 'deleted'],
        default: 'draft'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    creator_id: {
        type: mongoose.ObjectId,
        // required: true

    },
    exec_type: {
        type: String,
        enum: ["short", "rolling", "tutorial"],
        required: true
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true
    },

    tags: [String],

    prog_lang: {
        type: mongoose.ObjectId,
        required: true

    },
    dev_time: {
        type: String
    },
    content: {
        content: {
            type: String,
            // required: true,
        },
        sources: [{

            name: String,
            url: String

        }]

    },
    solution: String,//solution:{type:string}


})

module.exports = mongoose.model('exercise', ExcerSchema)//create Schema/collection with new name-user


