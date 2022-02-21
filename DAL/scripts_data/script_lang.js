require('dotenv').config({ path: '.env' })
require('../db')
const LangModel = require('../models/LangModel');
const ExerciseModel = require('../models/ExerciseModel');
let id_js, id_go, id_csharp;
let lang_json = require('./lang.json');
let js_json = require('./exercise_js.json');
let go_json = require('./exercise_go.json');
let csharp_json = require('./exercise_csharp.json');

async function createExercise(exer_name,json_file,id){
    console.log(`-----------START EXERCISE ${exer_name}-------------`);
    for (e of json_file) {
        e.prog_lang = id
        const r = await ExerciseModel.create(e)
        console.log(`*********${r.title} | ${r.prog_lang}***********`);
    }
    console.log(`-----------END EXERCISE ${exer_name}-------------`);
    console.log();
}

async function play(){
    console.log(`-----------START LANG-------------`);
    for (l of lang_json) {
        const r = await LangModel.create(l)
        console.log(`*********${r.prog_lang}***********`);
        if (l.prog_lang == 'JavaScript') {
            id_js = r._id
        }
        if (l.prog_lang == 'C#') {
            id_csharp = r._id
        }
        if (l.prog_lang == 'Bash') {
            id_go = r._id
        }
    }
    console.log(`-----------END LANG-------------`);
    console.log();
    await createExercise('JavaScript', js_json,id_js)
    await createExercise('Go', go_json,id_go)
    await createExercise('C#', csharp_json,id_csharp)
    
}

play()