import "./Login.css"
import { useState, useContext, useEffect } from "react"; //hook
import axios from "axios"
import { UserContext } from "D:/גיבוי-לימודים/לימודים/Bootcamp_fullstack/‏‏finalProjet2/server/client/src/App"
import { useNavigate } from "react-router-dom"

function getTokentoLocalStorage(newToken) {
    console.log(newToken);
    let New_Token = newToken;
    // Save data to sessionStorage->sessionStorage.setItem('key', 'value');
    localStorage.setItem('token', JSON.stringify(New_Token));//get data from localstorge
    alert("User connected!");
    Login(New_Token);
}



function Login(New_Token) {
    console.log(New_Token);

    const [registerButton, setregisterButton] = useState(true) //[new var/state,function that create/handle]
    const { loginUser, setloginUser } = useContext(UserContext)
    const { setregisteruser } = useContext(UserContext)
    
    
    let navigate = useNavigate();
    const SendRegister = e => {
        navigate("/");
        e.preventDefault()
        e.stopPropagation();

        let form = e.target

        let newRegisterForm = {
            "name": form[0].value,
            "email": form[1].value,
            "password": form[2].value

        }
        let values = newRegisterForm
        axios.post('http://localhost:3004/register', values)
            .then(() => {
                form.reset()
                setregisteruser(values)
            })
        alert("User Sign-In/Register!")      
          // function getAllValues(form) {
        //     return Object.values(form)
        //         .reduce((acc, curr) => {
        //             let { value, name } = curr
        //             return name ? { ...acc, [name]: value } : acc
        //         }, {})
        // }
    }


    const SendLogin = e => {
        navigate("/");
        e.preventDefault();
        e.stopPropagation();

        let form = e.target

        let newloginForm = {
            "email": form[0].value,
            "password": form[1].value
        }
        let values = newloginForm
        axios.post('http://localhost:3004/login', values)
            .then((result) => {
                form.reset()
                setloginUser(result.data) /////

                //    if(result.data.status===400) return setEror(true)
                //     sessionStorage.setItem('token', result.data.token)
                //     setToken(result.data.token)
                //        if(result.data.result) return nevigate('/')
                //console.log(result.data.token);
            })
        console.log(loginUser.token);
        let newToken = loginUser.token;
        getTokentoLocalStorage(newToken);
    }


    useEffect(() => {
        //console.log(loginUser);

    }, [loginUser])

    return (
        <div className="mainLogin">
            {registerButton ? (
                <div className="login-page">

                    <div className="login">
                        <h2>התחברות</h2>
                        <form className="loginForm" onSubmit={SendLogin}>
                            <div>
                                <input className="input" type="text" placeholder="אנא הכנס מייל" required></input>
                            </div>
                            <div>
                                <input className="input" type="password" placeholder="אנא הכנס סיסמה" required></input>
                            </div>
                            <input className="loginSubmit" type="submit" value="התחבר"></input>
                        </form>
                        <div className="registerFromLogin">
                            שכחת להירשם?
                            <button className="registerFromLoginButton"
                                onClick={() => setregisterButton(false)}>הירשם</button>

                        </div>
                    </div>
                </div>
            ) :
                (
                    <div className="Signup-page">
                        <div className="Signup">
                            <h2>הרשמה</h2>
                            <form className="SignupForm" onSubmit={SendRegister}>
                                <div>
                                    <input className="input" type="text" placeholder="אנא הכנס שם מלא" required></input>
                                </div>
                                <div>
                                    <input className="input" type="text" placeholder="אנא הכנס מייל" required></input>
                                </div>
                                <div>
                                    <input className="input" type="password" placeholder="אנא הכנס סיסמה" required></input>
                                </div>
                                <span className="twoButtons">
                                    <div className="div-returnToLogin">
                                        <button className="returnToLogin" onClick={() => setregisterButton(true)}>
                                            כבר רשום?{" "}
                                        </button>
                                    </div>
                                    <input className="SignupButton" type="submit" value="הרשם"></input>
                                </span>
                            </form>
                        </div>

                    </div >

                )
            }
        </div>
    );
}
export default Login;
