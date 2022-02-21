import axios from "axios"
import { useState, useEffect } from "react"; //hook
import { useParams,NavLink } from "react-router-dom";

function Exercise() {
    const [ExerciseData, setExerciseData] = useState()
    const params = useParams()


    useEffect(getLanguage, []);
    function getLanguage() {
        axios.get(`http://localhost:3004/exercise/${params.id}`)
            .then(result => {
                setExerciseData(result.data)
            })


    }
    console.log(ExerciseData)


    return (
        <div className="SpecExerciseDetails">
            {ExerciseData ?
                <div>
                    <NavLink to="/" className="close-btn" onClick={() => ([])}>
                         חזרה לדף בית/שפות
                    </NavLink>
                    <h1>{ExerciseData.excersise[0].title}</h1>
                    <div>{ExerciseData.excersise[0].content.content}</div>
                    {/* {<img src={props.icon} width="50" height="50" className='icon' />} */}
                    <div>{ExerciseData.excersise[0].icon}</div>
                    <div>{ExerciseData.excersise[0].description}</div>
                    <div>{ExerciseData.excersise[0].status}</div>
                    <div>{ExerciseData.excersise[0].date}</div>
                    <div>{ExerciseData.excersise[0].exec_type}</div>
                    <div>{ExerciseData.excersise[0].difficulty}</div>
                    <div>{ExerciseData.excersise[0].tags.join(", ")}</div>
                    <div>{ExerciseData.excersise[0].solution}</div>
                    <div>{ExerciseData.excersise[0].content.sources.name}</div>
                    <div>{ExerciseData.excersise[0].content.sources.url}</div>

                </div>
                : 'Loading'
            }
        </div>
    )
}

export default Exercise
