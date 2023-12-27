import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

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
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="User name"
          type="text" 
          />
        <br/>
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
          value="Register"
          type="submit"
        />
      </form>
    </div>    
  );
}

export default RegistrationForm;
