import React from "react"
import './Components.css'
import { doctors, patients } from '../helpers/users'

const LogInOrRegister = () => {

  const logInRef = React.useRef()
  const logInEmailRef = React.useRef()

  const dispatchLogInSuccessEvent = () => {
    document.dispatchEvent(new CustomEvent('logInSuccessful'))
  }

  // fake log in mechanism
  const logIn = (e) => {
    const email = logInEmailRef.current.value
    console.log('try log in as: ' + email)
    if (email.includes('doctor')) {
      localStorage.setItem('user', doctors[0].name)
      localStorage.setItem('isDoctor', true)
      localStorage.setItem('accountId', doctors[0].account)
      dispatchLogInSuccessEvent()
    } else {
      localStorage.setItem('user', patients[0].name)
      localStorage.setItem('isDoctor', false)
      localStorage.setItem('accountId', patients[0].account)
      dispatchLogInSuccessEvent()
    }
  }
  React.useEffect(
    () => {
      const logInElement = logInRef.current
      logInElement.addEventListener('click', logIn)
      return () => {
        logInElement.removeEventListener('click', logIn)
      }
    /* eslint-disable-next-line */
    }, []
  )

  return (
    <div>
      <h2>Log in</h2>
      <p>For existing users.</p>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Email address:</span>
        </div>
        <input ref={logInEmailRef} type="email" className="form-control" id="logInEmail" aria-describedby="emailHelp" placeholder="Your email address" />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Password:</span>
        </div>
        <input type="password" className="form-control" id="logInPassword" placeholder="Password" />
      </div>
      <button ref={logInRef} className="btn btn-primary">Log in</button>

      <hr />

      <h2>Register</h2>
      <p>As a new user.</p>
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
      <button disabled className="btn btn-primary">Register</button>
    </div>
  )
}

export default LogInOrRegister;