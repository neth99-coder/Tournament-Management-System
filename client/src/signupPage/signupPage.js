import React, { useEffect, useState } from "react"
import axios from "axios"

import "./styles/signupPage.css"

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDOB] = useState("");
    const [country, setCountry] = useState("");

    function signup(event) {
        console.log(event);
        event.preventDefault();

        const data = {name, email, password, gender, dob, country, type : 2};

        //console.log(data);

        axios.post("http://localhost:3001/api/auth/signup", data).then(function (res) {
            console.log(res.data)
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
                     <label>Name</label>
                     <input type="text" class="form-control" placeholder="Name" onChange={(e) => {
                  setName(e.target.value);
                }}/>
                  </div>
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
                  </div><div class="form-group">
                     <label>Gender</label>
                     <input type="text" class="form-control" placeholder="Gender" onChange={(e) => {
                  setGender(e.target.value);
                }}/>
                  </div>
                  <div class="form-group">
                     <label>DOB</label>
                     <input type="text" class="form-control" placeholder="DOB" onChange={(e) => {
                  setDOB(e.target.value);
                }}/>
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input type="text" class="form-control" placeholder="Country" onChange={(e) => {
                  setCountry(e.target.value);
                }}/>
                  </div>
                  <button type="submit" class="btn btn-black">Login</button>
                  <button type="submit" class="btn btn-secondary"  onClick={signup}>Register</button>
               </form>
            </div>
         </div>
      </div>
      </div>
    )
}

export default SignupPage