import React, { useState } from "react";
import axios from "axios";
import "./styles/loginPage.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(0);
  let navigate = useNavigate();
  function login(event) {
    console.log(event);
    event.preventDefault();

    const data = { email, password, type };
    axios
      .post("http://localhost:3001/api/auth/login", data)
      .then(function (res) {
        const { success, result } = res.data;
        if (success) {
          localStorage.setItem("user", res.data.result);
          let decoded = jwt_decode(result);
          console.log("Login Successful");
          switch (decoded.type) {
            case 0:
              navigate("/player");
              window.location.reload(false);
              break;
            case 1:
              navigate("/organizer");
              window.location.reload(false);

              break;
            case 2:
              navigate("/admin");
              window.location.reload(false);

              break;
            default:
              break;
          }
        } else {
          console.log("Login Failed");
          window.alert("Invalid login attempt!!");
          window.location.reload(false);
        }
      });
  }

  function setTypeUser(event) {
    setType(0);
    document.getElementById("organizerBtn").classList.remove("btn-secondary");
    document.getElementById("playerBtn").classList.add("btn-secondary");
    document.getElementById("adminBtn").classList.remove("btn-secondary");
  }

  function setTypeOrganizer(event) {
    setType(1);
    document.getElementById("organizerBtn").classList.add("btn-secondary");
    document.getElementById("playerBtn").classList.remove("btn-secondary");
    document.getElementById("adminBtn").classList.remove("btn-secondary");
  }

  function setTypeAdmin(event) {
    setType(2);
    document.getElementById("organizerBtn").classList.remove("btn-secondary");
    document.getElementById("playerBtn").classList.remove("btn-secondary");
    document.getElementById("adminBtn").classList.add("btn-secondary");
  }

  return (
    <div>
      <button
        class="btn btn-black btn-secondary"
        id="playerBtn"
        style={{ margin: "10px" }}
        onClick={setTypeUser}
      >
        Player
      </button>
      <button
        class="btn btn-black"
        id="organizerBtn"
        style={{ margin: "10px" }}
        onClick={setTypeOrganizer}
      >
        Organizer
      </button>
      <button
        class="btn btn-black"
        id="adminBtn"
        style={{ margin: "10px" }}
        onClick={setTypeAdmin}
      >
        Admin
      </button>

      <div class="login-sidenav">
        <div class="login-main-text">
          <h1>
            IJGames
            <br /> Login Page
          </h1>
          <h4>Login from here to access.</h4>
        </div>
      </div>
      <div class="login-main">
        <div class="col-md-6 col-sm-12">
          <div class="login-form">
            <form onSubmit={login}>
              <div class="form-group">
                <label style={{ color: "white" }}>Email</label>
                <input
                  type="email"
                  class="form-control"
                  style={{ margin: "10px" }}
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div class="form-group">
                <label style={{ color: "white" }}>Password</label>
                <input
                  type="password"
                  class="form-control"
                  style={{ margin: "10px" }}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                class="btn btn-black"
                style={{ margin: "10px" }}
                // onSubmit={login}
              >
                Login
              </button>
              {/* <button type="submit" class="btn btn-secondary" style={{margin:"10px"}}>Sign Up</button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
