import React from "react"
import './Components.css'

const LogInOrRegister = () => {
    return (
        <div>
            <h2>Log in</h2>
            <p>For existing users.</p>
            <form>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Email address:</span>
                    </div>
                    <input type="email" className="form-control" id="logInEmail" aria-describedby="emailHelp" placeholder="Your email address" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Password:</span>
                    </div>
                    <input type="password" className="form-control" id="logInPassword" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>

            <hr />

            <h2>Register</h2>
            <p>As a new user.</p>
            <form>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">First Name:</span>
                    </div>
                    <input type="email" className="form-control" id="registerFirstName" aria-describedby="emailHelp" placeholder="Max" />
                    <div className="input-group-prepend">
                        <span className="input-group-text">Last Name:</span>
                    </div>
                    <input type="email" className="form-control" id="registerLastName" aria-describedby="emailHelp" placeholder="Mustermann" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Email address:</span>
                    </div>
                    <input type="email" className="form-control" id="lregisterEmail" aria-describedby="emailHelp" placeholder="max.mustermann@mail.ru" />
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Password:</span>
                    </div>
                    <input type="password" className="form-control" id="registerPassword" placeholder="Password" />
                </div>
                <small id="emailHelp" className="form-text text-muted mb-3">We'll never share your personal data with anyone else.</small>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default LogInOrRegister;