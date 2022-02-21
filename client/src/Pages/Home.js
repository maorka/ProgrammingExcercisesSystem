import React from 'react'
import AllExercise from '../Components/Allexercise/AllExercise'
import { useState } from "react"; //hook
import "./Home.css"

export default function Home() {
    const [enterPage, setEnterPage] = useState(true); //[new var/state,function that create/handle]


    // const enterHomePage = (e) => {
    //     setEnterPage = false;

    // }

    return (
        <>

            {enterPage ? (

                <div className='homePage'>
                    <h2> ברוכים  הבאים </h2>
                    <br></br>
                    <div className='welcomeText'>
                       ברוכים הבאים למערכת לומדה,ללימודי קוד ותכנות בעברית,במערכת הזו ישנם תרגילי תכנות בכל הרמות,
                       עם לא פחות מ40 שפות ,מערכת זו מיועדת למורים ולתלמידים,סטודנטים,בתחומי המדמ"ח,התוכנה והמחשבים,
                       דף הבית מיועד למשתמשים,שהם הסטודנטים או תלמידי בית-הספר,ועמוד דף הניהול מיועד לארגונים,מורה מקצוע המחשבים,
                       או מרצה למקצועות המדמ"ח 
                       במערכת זו הינכם יכולים לפלטר  תרגילים לפי נושאים,יכולים לסמן תרגילים כמועדפים,בתור מנהלים תוכלו
                       לערוך תרגילים,להוסיף תרגילים ,לנהל משתמשים שרלוונטים לכיתה שלכם ועוד....
                       מכנים? לחצו על כפתור הכניסה.

                    </div>
                    <button onClick={() => setEnterPage(false)} className='entryButton'> לכניסה</button>
                </div>
            ) : (

                <AllExercise />
            )
            }
        </>
    )
}
