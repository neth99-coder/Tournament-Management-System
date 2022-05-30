import React, { useEffect, useState } from "react"
import axios from "axios"

import "./styles/loginPage.css"

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(event) {
        console.log(event);
        event.preventDefault();

        const data = {email, password, type : 2};

        axios.post("http://localhost:3001/api/auth/login", data).then(function (res) {
            console.log(res.data);
            const {success} = res.data;
            console.log(success);
            if (success) {
                console.log("Login Successful");
            } else {
                console.log("Login Failed");
            }
        })
    }

    return (
        <div>
        <div class="sidenav">
         <div class="login-main-text">
            <h2>IJGames<br/> Login Page</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>
      <div class="main">
         <div class="col-md-6 col-sm-12">
            <div class="login-form">
               <form>
                  <div class="form-group">
                     <label>Email</label>
                     <input type="text" class="form-control" placeholder="Email" onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input type="password" class="form-control" placeholder="Password" onChange={(e) => {
                  setPassword(e.target.value);
                }}/>
                  </div>
                  <button type="submit" class="btn btn-black" onClick={login}>Login</button>
                  <button type="submit" class="btn btn-secondary">Register</button>
               </form>
            </div>
         </div>
      </div>
      </div>
    )
}

export default LoginPage