import React, {useState } from "react";
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
          localStorage.setItem("user", JSON.stringify(res.data.result));
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
  }

  function setTypeOrganizer(event) {
    setType(1);
  }

  function setTypeAdmin(event) {
    setType(2);
  }

  return (
    <div>
      <button
        class="btn btn-black"
        style={{ margin: "10px" }}
        onClick={setTypeUser}
      >
        Player
      </button>
      <button
        class="btn btn-black"
        style={{ margin: "10px" }}
        onClick={setTypeOrganizer}
      >
        Organizer
      </button>
      <button
        class="btn btn-black"
        style={{ margin: "10px" }}
        onClick={setTypeAdmin}
      >
        Admin
      </button>

      <div class="sidenav">
        <div class="login-main-text">
          <h2>
            IJGames
            <br /> Login Page
          </h2>
          <p>Login from here to access.</p>
        </div>
      </div>
      <div class="main">
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