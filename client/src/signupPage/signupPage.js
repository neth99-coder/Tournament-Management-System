import React, { useState } from "react";
import axios from "axios";

import "./styles/signupPage.css";
import countryList from "react-select-country-list";
function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(0);
  const [dob, setDOB] = useState(null);
  const [country, setCountry] = useState("");

  function signup(event) {
    event.preventDefault();

    const data = { name, email, password, gender, dob, country, type: 0 };
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      dob === null ||
      country === "" ||
      confirmPassword === ""
    ) {
      alert("fill all fields");
    } else if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      axios
        .post(
          "https://tournament-management-system-1.herokuapp.com/api/auth/signup",
          data
        )
        .then(
          function (res) {
            if (res.data.result === "user found") {
              alert("user already exist");
            } else {
              const { success } = res.data;
              console.log(success);
              if (success) {
                alert("Signup Successful");
                window.location.href = "/login";
              } else {
                alert("Sign Up Failed");
                window.location.reload(false);
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  return (
    <div>
      <div class="sidenav">
        <div class="signup-main-text">
          <h1>
            IJGames
            <br />{" "}
          </h1>
          <h4>Welcome !! lets get started.</h4>
        </div>
      </div>
      <div class="main signup-box">
        <div class="col-md-6 col-sm-12">
          <div class="signup-form">
            <form class="signup-form-form">
              <div class="form-group">
                <label style={{ color: "white" }}>Name</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  style={{ margin: "10px" }}
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div class="form-group">
                <label style={{ color: "white" }}>Email</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  style={{ margin: "10px" }}
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div class="form-group">
                <label style={{ color: "white" }}>Password</label>
                <input
                  type="password"
                  class="form-control"
                  required
                  style={{ margin: "10px" }}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div class="form-group">
                <label style={{ color: "white" }}>Password</label>
                <input
                  type="password"
                  class="form-control"
                  required
                  style={{ margin: "10px" }}
                  placeholder=" Confirm Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <div class="form-group">
                <label style={{ color: "white" }}>Gender</label>
                {/* <input type="text" class="form-control" style={{ margin: "10px" }} placeholder="Gender" onChange={(e) => {
                           setGender(e.target.value);
                        
                        }} /> */}
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  required
                  style={{ margin: "10px" }}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value={1}>Male</option>
                  <option value={0}>Female</option>
                </select>
              </div>
              <div class="form-group">
                <label style={{ color: "white" }}>DOB</label>
                <input
                  type="date"
                  class="form-control"
                  style={{ margin: "10px" }}
                  required
                  placeholder="DOB"
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                />
              </div>

              <div class="form-group">
                <label style={{ color: "white" }}>Country</label>
                <select
                  className="form-control"
                  name="country"
                  id="country"
                  style={{ margin: "10px" }}
                  value={country || ""}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  required
                >
                  {countryList()
                    .getData()
                    .map((element) => (
                      <option key={element.value}>{element.label}</option>
                    ))}
                </select>
              </div>
              <button
                class="btn btn-secondary"
                type="submit"
                style={{ marginLeft: "20px", margin: "10px" }}
                onClick={(e) => {
                  signup(e);
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
