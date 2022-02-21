import axios from "axios";
import { useState, useEffect } from "react"; //hook
//import { NavLink } from "react-router-dom";
import "./AdminCreateExercise.css";
import { useNavigate } from "react-router-dom"

export default function AdminCreateExercise() {
    const [ExerciseData, setExerciseData] = useState(),
        [newExercise, setnewExercise] = useState(),
        [LanguagesData, setLanguagesData] = useState()

    useEffect(getLanguage, []);
    useEffect(getExrcises, []);

    function getExrcises() {
        axios.get(`http://localhost:3004/exerciseAll`)
            .then(result => {
                setExerciseData(result.data)
            })


    }
    console.log(ExerciseData)

    function getLanguage() {
        axios.get(`http://localhost:3004/AllLanguages`)
            .then(result => {
                setLanguagesData(result.data)
            })


    }
    console.log(LanguagesData)
    //console.log(LanguagesData[0]._id)

    function ChangeInput(e) {
        const input = { ...newExercise }
        const filter = e.target.name
        if (filter == "content") {
            input.content.content = e.target.value

        }
        else if (filter == "nameSource") {
            // debugger
            input.content.sources.name = e.target.value

        }
        else if (filter == "linkSource") {
            // debugger
            input.content.sources.url = e.target.value

        }
        else {
            input[filter] = e.target.value
        }
        setExerciseData(input)
    }

    function CreateNewExercise(e) {
        e.preventDefault()
        let form = e.target

        //debugger
        let newExerciseForm = {
            "title": form[0].value,
            "icon": form[1].value,
            "dev_time": form[2].value,
            "description": form[3].value,
            "status": form[4].value,
            "prog_lang": form[5].value,
            "exec_type": form[6].value,
            "difficulty": form[7].value,
            "content": {
                "content": form[8].value,
                "sources": [{
                    "name": form[11].value,
                    "url": form[12].value
                }]

            },
            "tags": form[9].value,
            "solution": form[10].value

        }

        let newExerciseData = newExerciseForm
        // let accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWRiZGUzZGUwMjc4Y2FmODBjYTRiNSIsImVtYWlsIjoibWV0dW10YW1AZ21haWwuY29tIiwiaWF0IjoxNjQzOTA0MjEyLCJleHAiOjE2NDM5MDc4MTJ9.ph2Zuh9e0gki8OZLVS5IBzZcVUd3-usgnCzL8KreAm4"
        // const authAxios = axios.create({
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },

        // })
        axios.post(`http://localhost:3004/exercise`, newExerciseData)
            .then(() => {
                form.reset()
                setnewExercise(newExerciseData)
            })
            alert("Exercise created!")

    }
    //console.log(LanguagesData[0]._id)
    let navigate = useNavigate();
    function returnToAdmin() {
        navigate("/admin");
    }
    return (

        <>
            {ExerciseData ? (
                <div>
                    <div className="close-btn-admin-main">
                        <button className="close-btn-admin"
                            onClick={returnToAdmin}>
                            חזרה לדף מנהל {" "}
                        </button>
                    </div>

                    {LanguagesData ? (
                        <form className="AdminCreateExerciseDetails" onSubmit={CreateNewExercise}>
                            <div className="editCard">
                                <h1>  יצירת תרגיל חדש</h1>
                                <label htmlFor="title">כותרת:</label>
                                <input type="text" id="title" onChange={ChangeInput} name="title" />
                                {/* {<img src={props.icon} width="50" height="50" className='icon' />} */}
                                <label htmlFor="icon">אייקון:</label>
                                <input type="text" id="icon" onChange={ChangeInput} name="icon" />
                                <label htmlFor="dev_time">זמן פיתוח של תרגיל/זמן שלוקח לפתור תרגיל:</label>
                                <input type="text" id="dev_time" onChange={ChangeInput} name="dev_time" />
                                <label htmlFor="description">:תיאור התרגיל בקצרה</label>
                                <input type="text" id="description" onChange={ChangeInput} name="description" />

                                <label htmlFor="status">:סטטוס</label>
                                <select id="status" onChange={ChangeInput} name="status">
                                    <option></option>
                                    <option value="draft">טיוטא זמנית</option>
                                    <option value="publish">תרגיל מפורסם</option>
                                    <option value="deleted">נמחק</option>
                                </select>

                                <label htmlFor="prog_lang">:שפת תכנות</label>
                                <select id="prog_lang" onChange={ChangeInput} name="prog_lang">
                                    <option></option>
                                    <option value={LanguagesData[0]._id}> Go</option>
                                    <option value={LanguagesData[1]._id}>JavaScript </option>
                                    <option value={LanguagesData[2]._id}>C# </option>
                                    <option value={LanguagesData[3]._id}>Bash </option>
                                    <option value={LanguagesData[4]._id}>C </option>
                                    <option value={LanguagesData[5]._id}>C++ </option>
                                    <option value={LanguagesData[6]._id}>CFML </option>
                                    <option value={LanguagesData[7]._id}>Clojure </option>
                                    <option value={LanguagesData[8]._id}>ClojureScript </option>
                                    <option value={LanguagesData[9]._id}>CoffeeScript </option>
                                    <option value={LanguagesData[10]._id}>Common Lisp </option>
                                    <option value="deleted"></option>
                                </select>

                                <label htmlFor="exec_type">:סוג תרגיל</label>
                                <select id="exec_type" onChange={ChangeInput} name="exec_type">
                                    <option></option>
                                    <option value="short">קצר</option>
                                    <option value="rolling">תרגיל מתגלגל</option>
                                    <option value="tutorial">מדריך</option>
                                </select>

                                <label htmlFor="difficulty">:דרגת קושי</label>
                                <select id="difficulty" onChange={ChangeInput} name="difficulty">
                                    <option></option>
                                    <option value="easy">קל</option>
                                    <option value="medium">בינוני</option>
                                    <option value="hard">קשה</option>
                                </select>

                                <label htmlFor="content">תוכן התרגיל:</label>
                                <textarea id="content" onChange={ChangeInput}
                                    name="content" />

                                <label htmlFor="tags">תגיות:</label>
                                <input id="tags" onChange={ChangeInput} name="tags" />
                                <label htmlFor="solution">פתרון:</label>
                                <textarea id="solution" onChange={ChangeInput}
                                    name="solution" />
                                <label htmlFor="nameSource">הוסף שם-מקור א:</label>
                                <input id="nameSource" value="" onChange={ChangeInput} name="nameSource" />
                                <label htmlFor="linkSource"> מקור ב-הוסף לינק:</label>
                                <input id="linkSource" value="" onChange={ChangeInput} name="linkSource" />
                                <input type='submit' className="buttonInsideAdmin" value='צור תרגיל' />
                            </div>
                        </form>)
                        : (
                            'Loading...'
                        )}
                </div>

            ) : (
                'Loading'
            )}
        </>


    )
}
