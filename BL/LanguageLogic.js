let LanguageController = require(`../DAL/controllers/LangugaeController`)

async function read(_id) {
    let filter = _id ? { _id } : {}
    return await LanguageController.read(filter)
}



module.exports = {
    read,
}

