require('../db')
let mongoose = require('mongoose')

const languageModel =require('../models/LangModel')

// let data=    {
//     "icon": "maor icon",
//     "prog_lang": "Python",
//     "tags": [
//         "Python"
//     ],
// }


async function create(data) {
    return await languageModel.create(data)
}

//read also realAll
async function read(filter = {}, projection) {
    return await languageModel.find(filter, projection)
}

async function update(_id, data) {
    return await languageModel.findByIdAndUpdate(
        _id,
        data,
        { new: true, runValidators: true }
    )
}

module.exports = {
    create,
    read,
    update
}



//create(langTemp);