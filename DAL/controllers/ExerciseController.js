require('../db')
let ExerciseModel = require('../models/ExerciseModel')

// let execTemplate = {
//     icon: "icon.jpg",
//     title: "My first Excersise",
//     details: "bla bla bla",
//     status: 'draft'
//     ,
//     exec_type:
//         "short"

//     ,
//     description:
//         "medium",

//     tags: ['Loops', 'Functions'],

//     prog_lang: mongoose.Types.ObjectId,
//     dev_time: "",
//     content: {
//         content: "bla bla",
//         sources: [{

//             name: "Link1",
//             url: "https://google.com"

//         }]

//     },
//     solution: "my Solution",


// }


async function create(data) {
    return await ExerciseModel.create(data)
}

//read also realAll
async function read(filter = {}, projection) {
    return await ExerciseModel.find(filter, projection)
}



async function update(id, newData) {
    return await ExerciseModel.findByIdAndUpdate(id,newData,
          { new: true,runValidators: true  });//callback function that returns the data

}

async function remove(_id) {
    return ExerciseModel.findByIdAndDelete(_id, { status: "deleted" })
}

async function removeAll(_id) {
    return ExerciseModel.deleteMany({})
}


module.exports = {
    create,
    read,
    update,
    remove,
    removeAll
}

// function del(id) {
//     return exceModel.findByIdAndDelete(id);
// }
// function delAll() {
//     return exceModel.deleteMany({});
// }

//create(execTemplate)
// del(id)
//delAll()
// console.log('reading data')
//read()
//readAll()
//update(id, {title: "maor"})