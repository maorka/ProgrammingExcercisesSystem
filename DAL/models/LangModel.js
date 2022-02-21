let mongoose = require('mongoose')//import mongoose package

const LangSchema = new mongoose.Schema({      //new Schama
    icon: {
        type: String
    },
    prog_lang: {
        type: String,   //type: mongoose.SchemaTypes.ObjectId
        required: true//
        //unique: true,
        // minlength: 1   //minimal length of name,1 characters 
    },

    tags: [String]

})

module.exports = mongoose.model('languages', LangSchema)//create Schema/collection with new name-user


