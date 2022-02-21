import { NavLink } from "react-router-dom";
import "./Admin.css"
function Admin() {
    return (
        <div className="MainAdmin">
            <div className="AdminPageMain">
                <NavLink to="/Admin/exercise" className="AdminCreateExerciseButton" onClick={() => ([])}>
                    יצירת תרגיל חדש
                </NavLink>
                <NavLink to="/Admin/languages" className="AdminEditExerciseButton" onClick={() => ([])}>
                    עריכת תרגיל קיים
                </NavLink>
            </div>
        </div>
    )
}

export default Admin
