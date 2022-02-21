let mongoose = require('mongoose')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

require('../db')

const userModel =require('../models/UserModel')

//user  pattern
// let userTemp = {
//     name:"yotam",
//     email:"yotam@gmail.com",
//     password:"1234",
//     cred_type:"user",
// }

async function create(data) {
    return await userModel.create(data)
}

//read also realAll
async function read(filter={},projection) {
    return await userModel.find(filter,projection)//find({},`+password`) to get password

}


async function update(_id,data) {

    return await userModel.findByIdAndUpdate(
        _id,
        data,
        { new: true, runValidators: true }

        )//find({},`+password`) to get password

}

// create(userTemp)
//readAll("61d6a6d1c2d3c937c75ff488")

module.exports = {
    create,
    read,
    update
}