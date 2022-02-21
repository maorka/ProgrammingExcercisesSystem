require('dotenv').config({ path: '.env' })
const bcryptjs = require('bcryptjs')
let jwt = require('jsonwebtoken')

let userController = require(`../DAL/controllers/userController`)

/////////////////////Logic layer

async function create(data) {
    // if (!data.email?.includes('@'))
    // throw 'you forgot to put @'

    return userController.create(data)     //use create function from DL layer
}

async function update(data) {
    data.lastSeen = Date.now()
    return userController.update(data._id, data)     //use create function from DL layer
}

async function register(data) {
    if (!data.name || !data.email) {
        console.log('\x1b[31m', " Error,check if first name and email fields filled correctly from client ");
        throw `first name and emil  are required`
    }
    if (!data.password) {
        console.log('\x1b[31m', " Error,check if password filled correctly from client ");
        throw `password  required`
    }

    data.password = bcryptjs.hashSync(data.password)

    return create(data)


}

async function login(email, password) {
    let user = (await userController.read({ email }, '+password'))[0]

    if (!user)
        //throw 'email or password invalid'
        throw 'No such user(email)'

    if (!bcryptjs.compareSync(password, user.password))
        throw 'Email or password invalid'

    update(user)
    
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_KEY,
        {
            expiresIn: "3H"//3 hours expired
        })

    return token
}

module.exports = {
    ...userController,
    create,
    update,
    register,
    login
}