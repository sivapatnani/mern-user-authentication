import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import Dashboard from "./pages/Dashboard";
const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={LoginForm}/>
          <Route path="/login" exact Component={LoginForm}/>
          <Route path="/register" exact Component={RegistrationForm}/>
          <Route path="/dashboard" exact Component={Dashboard}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
