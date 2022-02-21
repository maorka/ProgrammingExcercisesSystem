let ExerciseController = require(`../DAL/controllers/ExerciseController`)

async function create(data) {
    return await ExerciseController.create(data)
}

async function read(_id) {
    let filter = _id ? { _id } : {}
    return await ExerciseController.read(filter)
}

async function readExcerByLang(prog_lang) {
    let filter = prog_lang ? { prog_lang } : {}
    return await ExerciseController.read(filter)
}

async function update(id,data) {
    data.date = Date.now()
    return await ExerciseController.update(id, data)
}



function deleteExer(_id) {
    return ExerciseController.remove(_id);
}

function delAllExercises() {
    return ExerciseController.removeAll({});
}

module.exports = {
    ...ExerciseController,
    create,
    update,
    read,
    readExcerByLang,
    deleteExer,
    delAllExercises,
}