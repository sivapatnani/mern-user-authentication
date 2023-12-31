import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles.css"

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()

  const onSubmit = async(event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = await response.json();
    console.log(data);
    if (data.user) {
      localStorage.setItem("token", data.user)
      alert("Login successful")
      history("/dashboard")
    } else {
      alert ("Please check user name and password")
    }
  }

  return (
    <div className="body-wrapper">
      <div className="form-center">
        <h2 className="form-title">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              data-testid="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email" 
            />
          </div>
          <div className="form-field">
            <label data-testid="password" className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password" 
            />
          </div>
          <div className="form-field submit-field">
            <input
              value="Submit"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>    
  );
}

export default LoginForm;
