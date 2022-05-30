import React, { useEffect, useState } from "react"
import axios from "axios"

import "./styles/signupPage.css"

function SignupPage() {
<<<<<<< Updated upstream
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
=======
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [gender, setGender] = useState(0);
   const [dob, setDOB] = useState(null);
   const [country, setCountry] = useState("");


   function signup(event) {

      event.preventDefault();

      const data = { name, email, password, gender, dob, country, type: 0 };
      if (name==="" ||email==="" || password===""||dob===null||country===""){
         alert("fill all fields");
      }else{

      axios.post("http://localhost:3001/api/auth/signup", data).then(function (res) {
         if (res.data.result == "user found") {
            alert("user already exist")
         } else {



            const { success } = res.data;
            console.log(success);
            if (success) {
               alert("Signup Successful");
            } else {
               alert("Sign Up Failed");
            }
         }
      }, (error) => {
         console.log(error);
      }
      );}
   }

   return (
      <div>
         <div class="sidenav">
            <div class="signup-main-text">
               <h2>IJGames<br /> </h2>
               <p>Welcome !! lets get started.</p>
            </div>
         </div>
         <div class="main signup-box">
            <div class="col-md-6 col-sm-12">
               <div class="signup-form">
                  <form class="signup-form-form">
                     <div class="form-group">
                        <label style={{ color: "white" }}>Name</label>
                        <input type="text" class="form-control" required style={{ margin: "10px" }} placeholder="Name" onChange={(e) => {
                           setName(e.target.value);

                        }} />
                     </div>
                     <div class="form-group">
                        <label style={{ color: "white" }}>Email</label>
                        <input type="text" class="form-control" required style={{ margin: "10px" }} placeholder="Email" onChange={(e) => {
                           setEmail(e.target.value);
                        }} />
                     </div>
                     <div class="form-group">
                        <label style={{ color: "white" }}>Password</label>
                        <input type="password" class="form-control" required style={{ margin: "10px" }} placeholder="Password" onChange={(e) => {
                           setPassword(e.target.value);
                        }} />
                     </div><div class="form-group">
                        <label style={{ color: "white" }}>Gender</label>
                        {/* <input type="text" class="form-control" style={{ margin: "10px" }} placeholder="Gender" onChange={(e) => {
                           setGender(e.target.value);
                        
                        }} /> */}
                        <select class="form-control" id="exampleFormControlSelect1" required style={{ margin: "10px" }} onChange={(e) => {
                           setGender(e.target.value)
                        }
                        }>
                           <option value={1}>Male</option>
                           <option value={0}>Female</option>

                        </select>
                     </div>
                     <div class="form-group">
                        <label style={{ color: "white" }}>DOB</label>
                        <input type="date" class="form-control" style={{ margin: "10px" }} required placeholder="DOB" onChange={(e) => {
                           setDOB(e.target.value);
                        }} />
                     </div>
                     <div class="form-group">
                        <label style={{ color: "white" }}>Country</label>
                        <input type="text" class="form-control" style={{ margin: "10px" }} required placeholder="Country" onChange={(e) => {
                           setCountry(e.target.value);
                        }} />
                     </div>
                     <button class="btn btn-secondary" type="submit" style={{ marginLeft: '20px', margin: "10px" }} onClick={(e) => {signup(e);}}>Sign Up</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
>>>>>>> Stashed changes
}

export default SignupPage