function SigUp() {
    return (
        <div className="Signup-page">
        <div className="Signup">
            <h2>הרשמה</h2>
            <form className="SignupForm">
                <div>
                    <input className="input" type="text" placeholder="אנא הכנס שם מלא"></input>
                </div>
                <div>
                    <input className="input" type="text" placeholder="אנא הכנס מייל"></input>
                </div>
                <div>
                    <input className="input" type="password" placeholder="אנא הכנס סיסמה"></input>
                </div>
                <input className="SignupSubmit" type="submit" value="הרשם"></input>
            </form>
        </div>
        
    </div>
    )
}

export default SigUp
