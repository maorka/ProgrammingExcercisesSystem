
let
    ExecrsiceLogic = require(`./ExerciseLogic`),
    //LangLogic = require(`./LanguageLogic`),
    userLogic = require(`../BL//userLogic`)

async function getExcrise(_id) {
    let excersise = await ExecrsiceLogic.read(_id),

        user = await userLogic.read({ _id: excersise[0].creator_id }) //to find the right user for the exercise 


    return {
        excersise,
        user
    }
}

async function getExcriseById(prog_lang) {
    let excersiseByLangugae = await ExecrsiceLogic.readExcerByLang(prog_lang)

    return {
        excersiseByLangugae,
        
    }
}


module.exports = {
    getExcrise,
    getExcriseById
}

