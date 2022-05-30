import React, { useEffect, useState } from "react"
import axios from "axios"

import "./styles/loginPage.css"

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState(0);

    function login(event) {
        console.log(event);
        event.preventDefault();

        const data = {email, password, type};

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

    function setTypeUser(event) {
         setType(0);
    }

    function setTypeOrganizer(event) {
      setType(1);
 }

 function setTypeAdmin(event) {
   setType(2);
}

    return (
        <div>

<button class="btn btn-black" style={{margin:"10px"}} onClick={setTypeUser}>Player</button>
<button class="btn btn-black" style={{margin:"10px"}} onClick={setTypeOrganizer}>Organizer</button>
<button class="btn btn-black" style={{margin:"10px"}} onClick={setTypeAdmin}>Admin</button>

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
                     <label style={{color:"white"}}>Email</label>
                     <input type="text" class="form-control"  style={{margin:"10px"}}placeholder="Email" onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
                  </div>
                  <div class="form-group" >
                     <label style={{color:"white"}}>Password</label>
                     <input type="password" class="form-control" style={{margin:"10px"}} placeholder="Password" onChange={(e) => {
                  setPassword(e.target.value);
                }}/>
                  </div>
                  <button type="submit" class="btn btn-black" style={{margin:"10px"}} onClick={login}>Login</button>
                  {/* <button type="submit" class="btn btn-secondary" style={{margin:"10px"}}>Sign Up</button> */}
               </form>
            </div>
         </div>
      </div>
      </div>
    )
}

export default LoginPage