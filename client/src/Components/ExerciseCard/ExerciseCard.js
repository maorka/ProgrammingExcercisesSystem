import { Link } from "react-router-dom"
import "./Exercise.css"

function ExerciseCard(props) {
    return (
        
        <Link to={`${props.admin?'/admin':""}/exercise/${props._id}`} 
          className="one-exercise" >

            <div>
                
            {<img src={props.icon} width="50" height="50" className='icon' />}
                <h3>{ props.title}</h3>
                <p>{ props.description}</p>
                <span>
                { props.exec_type} 
                </span>
            </div>

            <div>
                <div>

                <small>{props.difficulty}</small>
                </div>
                <span>{props.status}</span>

            </div>

        
        </Link>
    )
}

export default ExerciseCard
