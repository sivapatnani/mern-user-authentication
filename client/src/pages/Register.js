import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles.css"

function RegistrationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()

  const registerUser = async(event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, password
      })
    })

    const data = await response.json();
    if(data.status === "ok") {
      history("/login")
    }
    console.log(data);
  }

  return (
    <div className="body-wrapper">
      <div className="form-center">
        <h2 className="form-title">New User</h2>
        <form onSubmit={registerUser}>
          <div className="form-field">
            <label className="form-label">User name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User name"
              type="text" 
              />
          </div>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email" 
            />
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password" 
            />
          </div>
          <div className="form-field submit-field">
            <input
              value="Register"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>    
  );
}

export default RegistrationForm;
