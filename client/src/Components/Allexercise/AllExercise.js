import axios from "axios";
import { useState, useEffect } from "react"; //hook
import "./Allexercise.css";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import LangCard from "../LangCard/LangCard";
import { useNavigate } from "react-router-dom"
function AllExercise(props) {

    ////////get request/////////////////////
    const [programsLangList, setProgramList] = useState([]), //[new var/state,function that create/handle]
        [exerciseList, setExerciseList] = useState([]),
        [filter, setFilter] = useState({ search: "", diff: "", exer_type: "" })


    function getFilteredSearch() {

        const filteredBySearch = filter.search
            ? exerciseList.filter(exercise => (exercise.title.includes(filter.search)) || (exercise.description.includes(filter.search)) ||
                (exercise.tags.find(element => element.includes(filter.search))))
            : exerciseList
        console.log(filteredBySearch)

        const filteredByDiff = filter.diff
            ? filteredBySearch.filter(exercise => exercise.difficulty.includes(filter.diff))
            : filteredBySearch

        console.log(filteredByDiff)
        const filteredByType = filter.exer_type
            ? filteredByDiff.filter(exercise => exercise.exec_type.includes(filter.exer_type))
            : filteredByDiff

        return filteredByType
    }
    const filteredArray = getFilteredSearch()



    function getSearchValue(e) {
        let searchValue = e.target.value;
        setFilter({ ...filter, search: searchValue });

    }

    function getDiffValue(e) {
        let diffValue = e.target.value;
        setFilter({ ...filter, diff: diffValue });

    }

    function getTypeValue(e) {
        let exer_typeValue = e.target.value;
        setFilter({ ...filter, exer_type: exer_typeValue });

    }

    let accessToken;
    // Get saved data from sessionStorage
    //let data = sessionStorage.getItem('key');
    if (localStorage.getItem('token') == null) {
        accessToken = ""
    }
    else {

        accessToken = localStorage.getItem('token').slice(1, 210)
    }

    console.log(accessToken);
 //   this change is only in the new test branch
    if (accessToken == "" && (props.admin==false||props.admin==undefined)) //make alert just for users and not for admin
    {
        alert("System disconnected,please Sign-UP!");
    }
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },

    })

    useEffect(getLanguages, []); //read function,on startup 1 time,run get Tasks one time and not infinte loop
    function getLanguages() {

        if (!props.admin) {

            authAxios.get("http://localhost:3004/language") //
                .then((result) => {
                    setProgramList(result.data);
                    console.log(result.data);
                    if (result.data.status === 401) {
                        alert("Youre not connected,please Sign-UP!");
                    }
                });
        }
        else {
            axios.get("http://localhost:3004/AllLanguages") //
                .then((result) => {
                    setProgramList(result.data); //
                    console.log(result.data)
                });


        }
    }
    let navigate = useNavigate();

    //   if (!programsLangList) return "Loading languages...";
    const DeleteLocalStorage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (accessToken) {
            localStorage.removeItem('token');// removing the localStorage item is as follows:
            navigate("/login");
        }
        else {
            alert("Youre not connected! please sign-up")
        }
    }

    function getExercises(id) {
        axios
            .get(`http://localhost:3004/excrciseByLanguage/${id}`)
            .then((result) => {
                console.log(result.data);
                setExerciseList(result.data.excersiseByLangugae);
            });
    }
    //   if (!exerciseList) return "Loading exercises...";

    return (
        <>
            {exerciseList.length ? (
                <div className="all-exercises">
                    <h2>תרגילים</h2>
                    <div className="div-close-btn">
                        <button className="close-btn"
                            onClick={() => setExerciseList([])}>
                            חזרה לרשימת השפות {" "}
                        </button>
                    </div>
                    <div className="LangFilter">
                        <div>
                            <input
                                type="search"
                                onChange={(e) => getSearchValue(e)}
                                className="search"
                                placeholder="חיפוש"
                            />
                        </div>

                        <div>
                            <label htmlFor="difficulty">דרגשת קושי</label>
                            <select onChange={(e) => getDiffValue(e)} id="difficulty">
                                <option></option>
                                <option value="easy">קל</option>
                                <option value="medium">בינוני</option>
                                <option value="hard">קשה</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="exec_type">סוג תרגיל</label>
                            <select onChange={(e) => getTypeValue(e)} id="exec_type">
                                <option></option>
                                <option value="short">קצר</option>
                                <option value="rolling">תרגיל מתגלגל</option>
                                <option value="tutorial">מדריך</option>
                            </select>
                        </div>
                    </div>
                    <div className="exercise-flex">
                        {filteredArray.map((excercise, i) => (
                            <ExerciseCard admin={props.admin} key={`f${i}`} {...excercise} />
                        ))}
                    </div>
                </div>
            ) :

                (

                    <div className="listOfProgramingLang">
                        <div>
                            {
                                accessToken ? (<button className="userDisconnect-btn"
                                    onClick={DeleteLocalStorage}>התנתק</button>) : (<div></div>)
                            }
                        </div>
                        <h2> רשימת שפות תכנות</h2>
                        <div className="mainLang">
                            {programsLangList.map((lang) => (
                                <div key={lang._id} onClick={() => getExercises(lang._id)}>
                                    <LangCard {...lang} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </>
    );
}
export default AllExercise;
