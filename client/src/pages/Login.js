import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()

  const registerUser = async(event) => {
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
      <h1>Login</h1>
      <form onSubmit={registerUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email" 
        />
        <br/>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password" 
        />
        <br/>
        <input
          value="Submit"
          type="submit"
        />
      </form>
    </div>    
  );
}

export default LoginForm;
