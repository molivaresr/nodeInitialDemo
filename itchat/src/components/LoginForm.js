import React, { useEffect, useRef} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'

export default function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
  
    let from = location.state.from.pathname || "/";
  
    function handleSubmit(event) {
      event.preventDefault();
  
      let formData = new FormData(event.currentTarget);
      let username = formData.get("username")
  
      auth.signin(username, () => {
        navigate(from, { replace: true });
      });
    }
  
    return (
      <div>
        <p>You must log in to view the page at {from}</p>
  
        <form onSubmit={handleSubmit}>
          <label>
            Username: <input name="username" type="text" />
          </label>{" "}
          <br/>
          <label>
            Email: <input name="email" type="text" />
          </label>{" "}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }