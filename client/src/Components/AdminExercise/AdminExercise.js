import axios from "axios";
import { useState, useEffect } from "react"; //hook
import { useParams, NavLink,useNavigate} from "react-router-dom";
import "./AdminExercise.css";

//import AllExercise from "../Allexercise/AllExercise";
//import { Spring, to, useSpring, animated } from 'react-spring';
export default function AdminExercise() {
    const [ExerciseData, setExerciseData] = useState()
    const [deleteExer, setDeleteExer] = useState()
    const params = useParams()
    useEffect(getLanguage, []);

    function getLanguage() {
        axios.get(`http://localhost:3004/exercise/${params.id}`)
            .then(result => {
                setExerciseData(result.data.excersise[0])
                console.log("Update Exercise-send request to server")
            })


    }
    let navigate = useNavigate();

    const deleteExercise=(e)=> {
        navigate("/Admin/languages");
        e.preventDefault()
        e.stopPropagation();

        axios.delete(`http://localhost:3004/exercise/delete/${params.id}`)
            .then(result => {
                setDeleteExer(result.data)
                console.log("Delete Exercise-send request to server")
            })

            alert("Exercise deleted!")

    }

    console.log(ExerciseData)

    function ChangeInput(e) {
        const input = { ...ExerciseData }
        const filter = e.target.name
        if (filter == "content") {
            if (input.content.content == null) {
                input.content.content = ""
            }
            else { input.content.content = e.target.value }

        }
        else if (filter == "nameSource") {
            if (input.content.sources[0].name == null) {
                input.content.sources[0].name = ""
            }
            else { input.content.sources[0].name = e.target.value }

        }
        else if (filter == "linkSource") {
            if (input.content.sources[0].url == null) {
                input.content.sources[0].name = ""
            }
            else {

                input.content.sources[0].url = e.target.value
            }

        }
        else {
            input[filter] = e.target.value
        }
        setExerciseData(input)
    }

    const UpdateExercise=(e)=> {
        navigate("/Admin/languages");
        e.preventDefault()
        e.stopPropagation();

        axios.put(`http://localhost:3004/exercise/${params.id}`, ExerciseData)
            .then(() => { })
            alert("Exercise updated!")

    }
    //const props = useSpring({ from: { opacity: 0, marginTop: -500 }, to: { opacity: 1, marginTop: 0 } })
    //debugger
    return (
        <div>
            <NavLink to="/Admin" className="close-btn" onClick={() => ([])}>
                ???????? ?????? ??????/????????
            </NavLink>

            <form className="AdminExerciseDetails" onSubmit={UpdateExercise}>
                {((ExerciseData) && (!deleteExer)) ?
                    <div className="editCard">
                        <h1>?????????? ??????????</h1>
                        <label htmlFor="title">??????????:</label>
                        <input type="text" id="title" value={ExerciseData.title} onChange={ChangeInput} name="title" required />
                        {/* {<img src={props.icon} width="50" height="50" className='icon' />} */}
                        <label htmlFor="icon">????????????:</label>
                        <input type="text" id="icon" value={ExerciseData.icon} onChange={ChangeInput} name="icon" />
                        <label htmlFor="dev_time">?????? ?????????? ???? ??????????/?????? ?????????? ?????????? ??????????:</label>
                        <input type="text" id="dev_time" value={ExerciseData.dev_time} onChange={ChangeInput} name="dev_time" />
                        <label htmlFor="description">?????????? ????????????(??????????):</label>
                        <input type="text" id="description" value={ExerciseData.description} onChange={ChangeInput} name="description" required />
                        <label htmlFor="status">??????????:</label>
                        <select id="status" value={ExerciseData.status} onChange={ChangeInput} name="status">
                            <option></option>
                            <option value="draft">?????????? ??????????</option>
                            <option value="publish">?????????? ????????????</option>
                            <option value="deleted">????????</option>
                        </select>
                        <label htmlFor="date">?????????? ?????????? ??????????:</label>
                        <input id="date" value={ExerciseData.date} onChange={ChangeInput} name="date" />

                        <label htmlFor="exec_type">?????? ??????????:</label>
                        <select id="exec_type" value={ExerciseData.exec_type} onChange={ChangeInput} name="exec_type">
                            <option></option>
                            <option value="short">??????</option>
                            <option value="rolling">?????????? ????????????</option>
                            <option value="tutorial">??????????</option>
                        </select>

                        <label htmlFor="difficulty">???????? ????????:</label>
                        <select id="difficulty" value={ExerciseData.difficulty} onChange={ChangeInput} name="difficulty">
                            <option></option>
                            <option value="easy">????</option>
                            <option value="medium">????????????</option>
                            <option value="hard">??????</option>
                        </select>


                        <label htmlFor="tags">??????????:</label>
                        <input id="tags" value={ExerciseData.tags} onChange={ChangeInput} name="tags" />
                        <label htmlFor="solution">??????????:</label>
                        <textarea id="solution" value={ExerciseData.solution} onChange={ChangeInput}
                            name="solution" />

                        <label htmlFor="content">???????? ????????????:</label>
                        <textarea id="content" value={ExerciseData.content.content} onChange={ChangeInput}
                            name="content" />
                        {/* <label htmlFor="nameSource"> ???? ???????? ????????????:</label>
                        <input id="nameSource" value={ExerciseData.content.sources[0].name} onChange={ChangeInput} name="nameSource" />
                        <label htmlFor="linkSource"> ????????-????????:</label>
                        <input id="linkSource" value={ExerciseData.content.sources[0].url} onChange={ChangeInput} name="linkSource" /> */}
                        <input type='submit' className="buttonInsideAdmin" value='???????? ??????????' />

                        <button  className="delete-btn" onClick={deleteExercise}>
                            ?????? ??????????
                        </button>

                        {/* <animated.div style={props}>
                            Exercise updated
                        </animated.div> */}

                    </div>
                    : 'Loading' 
                    //<AllExercise admin={true}/>
                     

                }
            </form>
        </div>
    )
}
