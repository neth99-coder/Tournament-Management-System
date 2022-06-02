/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { React, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles/tournament-card.css";
import "./styles/overlay-model.css";
import HomeNavbar from "../bars/HomeNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Playernavigationbar from "../bars/Playernavigationbar"
import Organizernavigationbar from "../bars/Organizernavigationbar"
import Adminnavigationbar from "../bars/Adminnavigationbar"

export default function TournamentPage(props) {
  const [team, setTeam] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [joinedTeam, setJoinedTeam] = useState(null);
  const [regState, setRegState] = useState("AS INDIVIDUAL");

  const player_id = authService.getUserID();
  console.log(player_id);

  const location = useLocation();

  useEffect(() => {

    if (authService.getUserType() === 2 || authService.getUserType() === 1) {
      document.getElementById("createTeamBtn").style.display = "none";
      document.getElementById("registerBtn").style.display = "none";
    }

    axios
      .post(
        "https://tournament-management-system-1.herokuapp.com/getReg",
        {
          playerId: player_id,
          tournamentID: location.state.TOURNAMENT_ID,
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then(function (response) {
        // handle success
        if (response.data.registered === true && joinedTeam === null) {
          setRegState("UN REGISTER");
          document.querySelector(".team-reg").classList.add("disabled");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    axios
      .post(
        "https://tournament-management-system-1.herokuapp.com/isInTeam",
        {
          playerId: player_id,
          tournamentID: location.state.TOURNAMENT_ID,
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then(function (response) {
        // handle success
        if (response.data.success === true) {
          if (response.data.result.length > 0) {
            setJoinedTeam(response.data.result[0].TEAM_ID);
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://tournament-management-system-1.herokuapp.com/register",
        {
          playerId: player_id,
          tournamentID: location.state.TOURNAMENT_ID,
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then(
        (response) => {
          if (response.data.success === true) {
            document.querySelector(".team-reg").classList.add("disabled");
            setRegState("UN REGISTER");
            alert("registerd successfully!");
          } else {
            alert("unable to register!");
          }
        },
        (error) => {
          alert("unable to register!");
          console.log(error);
        }
      );
  };

  const handleUnregister = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://tournament-management-system-1.herokuapp.com/unregister",
        {
          playerId: player_id,
          tournamentID: location.state.TOURNAMENT_ID,
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then(
        (response) => {
          if (response.data.success === true) {
            document.querySelector(".team-reg").classList.remove("disabled");
            setRegState("AS INDIVIDUAL");
            alert("unregisterd !");
          } else {
            alert("unable to unregister!");
          }
        },
        (error) => {
          alert("unable to unregister!");
          console.log(error);
        }
      );
  };

  const handleJoinTeam = (event, team_id) => {
    event.preventDefault();
    axios
      .post(
        "https://tournament-management-system-1.herokuapp.com/jointeam",
        {
          teamID: team_id,
          playerId: player_id,
          tournamentID: location.state.TOURNAMENT_ID,
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then(
        (response) => {
          if (response.data.success === true) {
            setJoinedTeam(team_id);
            alert("joined!");
            document.querySelector(".ind-reg").classList.add("disabled");
          } else {
            alert("unable to join!");
          }
        },
        (error) => {
          alert("unable to join!");
          console.log(error);
        }
      );
  };

  const handleLeaveTeam = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://tournament-management-system-1.herokuapp.com/leaveteam",
        {
          teamID: joinedTeam,
          playerId: player_id,
          tournamentID: location.state.TOURNAMENT_ID,
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then(
        (response) => {
          console.log(response);
          if (response.data.success === true) {
            setJoinedTeam(null);
            alert("left!");
            document.querySelector(".ind-reg").classList.remove("disabled");
          } else {
            alert("unable to leave!");
          }
        },
        (error) => {
          setJoinedTeam(null);
          console.log(error);
        }
      );
  };

  const handleViewTeams = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://tournament-management-system-1.herokuapp.com/viewteams",
        {
          tournamentID: location.state.TOURNAMENT_ID,
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then(
        (response) => {
          setTeamArray(response.data.result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://tournament-management-system-1.herokuapp.com/teamreq",
        {
          playerID: player_id,
          tournamentID: location.state.TOURNAMENT_ID,
          teamName: team,
        },
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then(
        (response) => {
          alert("Team Create Request Sent!");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  let navigate = useNavigate();
  return (
    <div>
      {/* <HomeNavbar /> */
        !authService.getCurrentUser() ? <HomeNavbar /> : authService.getUserType() === 0 ? <Playernavigationbar /> : authService.getUserType() === 1 ? <Organizernavigationbar /> : <Adminnavigationbar />
      }
      <div
        className="tournament-page-bg"
        style={{
          top: "70px",
          bottom: "0",
          left: "0",
          right: "0",
          width: "100%",
          height: "80%",
          backgroundImage: 'url("https://wallpaperaccess.com/full/7448.png")',
          position: "absolute",
          opacity: "0.25",
          pointerEvents: "none",
        }}
      ></div>{" "}
      <div
        className="tournament-container"
        style={{
          padding: "40px",
          marginTop: "5vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <table
          className="table table-striped table-dark"
          style={{ width: "400px" }}
        >
          <tbody>
            <tr>
              <td> Name </td> <td> {location.state.NAME} </td>{" "}
            </tr>{" "}
            <tr>
              <td> Organizer </td> <td> {location.state.ORGANIZER} </td>{" "}
            </tr>{" "}
            <tr>
              <td> Game </td> <td> {location.state.GAME} </td>{" "}
            </tr>{" "}
            <tr>
              <td> Date </td> <td> {location.state.DATE} </td>{" "}
            </tr>{" "}
            <tr>
              <td> Start </td> <td> {location.state.TIME} </td>{" "}
            </tr>{" "}
            <tr>
              <td> Registeration Closing </td>{" "}
              <td> {location.state.REG_CLOSE} </td>{" "}
            </tr>{" "}
          </tbody>{" "}
        </table>{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <button
            type="button"
            id="registerBtn"
            className="btn btn-outline-light"
            onClick={() => {
              if (!authService.getCurrentUser()) {
                navigate("/login");
                window.location.reload(false);
              }
              document.querySelector(
                ".reg-options-overlay"
              ).style.display = "block";
              document.querySelector(".reg-options").style.display = "flex";
            }}
          >
            REGISTER NOW{" "}
          </button>{" "}
          <button
            type="button"
            id="createTeamBtn"
            className="btn btn-outline-light"
            onClick={() => {
              if (!authService.getCurrentUser()) {
                navigate("/login");
                window.location.reload(false);
              }
              document.querySelector(
                ".create-team-form-overlay"
              ).style.display = "block";
              document.querySelector(".create-team-form").style.display =
                "block";
            }
            }
          >
            CREATE TEAM{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <div
        className="create-team-form-overlay overlay"
        onClick={() => {
          document.querySelector(".create-team-form-overlay").style.display =
            "none";
          document.querySelector(".create-team-form").style.display = "none";
        }}
      ></div>{" "}
      <Form className="create-team-form model">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Team Name </Form.Label>{" "}
          <Form.Control
            type="text"
            placeholder="Enter team name"
            required
            onChange={(e) => {
              setTeam(e.target.value);
            }}
            style={{ backgroundColor: "black", color: "white" }}
          />{" "}
        </Form.Group>{" "}
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <Button
            variant="outline-dark"
            style={{ color: "white", borderColor: "white" }}
            onClick={(e) => {
              if (team !== "") {
                handleSubmit(e);
              } else {
                alert("team name cannot be empty");
              }
            }}
          >
            Submit{" "}
          </Button>{" "}
        </div>{" "}
      </Form>{" "}
      <div>
        <div
          className="reg-options-overlay overlay"
          onClick={() => {
            document.querySelector(".reg-options-overlay").style.display =
              "none";
            document.querySelector(".reg-options").style.display = "none";
          }}
        ></div>{" "}
        <Form
          className="reg-options model"
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            height: "200px",
          }}
        >
          <button
            type="button"
            className="btn btn-outline-light ind-reg"
            onClick={(e) => {
              if (regState === "AS INDIVIDUAL") {
                handleRegister(e);
              } else {
                handleUnregister(e);
              }
            }}
          >
            {" "}
            {regState}{" "}
          </button>{" "}
          <button
            type="button"
            className="btn btn-outline-light team-reg"
            onClick={(e) => {
              handleViewTeams(e);
              document.querySelector(".select-team-overlay").style.display =
                "block";
              document.querySelector(".select-team-box").style.display =
                "block";
            }}
          >
            AS TEAM{" "}
          </button>{" "}
        </Form>{" "}
      </div>{" "}
      <div>
        <div
          className="select-team-overlay overlay"
          onClick={() => {
            document.querySelector(".select-team-overlay").style.display =
              "none";
            document.querySelector(".select-team-box").style.display = "none";
          }}
        >
          <h3 style={{ color: "white", marginTop: "90px", marginLeft: "20px" }}>
            {" "}
            PICK A TEAM{" "}
          </h3>{" "}
        </div>{" "}
        <div
          className="select-team-box model"
          style={{ width: "600px", border: "none", backgroundColor: "#F7F8F8", overflow: "scroll" }}
        >
          {" "}
          {teamArray.map((item, i) => {
            if (joinedTeam !== null) {
              if (joinedTeam === item["TEAM_ID"]) {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottom: "1px black solid ",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{ color: "black", padding: "10px" }}
                      id={item["TEAM_ID"]}
                    >
                      {" "}
                      {item["NAME"]}{" "}
                    </div>{" "}
                    <button
                      type="button"
                      class="btn btn-dark"
                      onClick={(e) => {
                        handleLeaveTeam(e);
                      }}
                    >
                      {" "}
                      Leave{" "}
                    </button>{" "}
                  </div>
                );
              } else {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottom: "1px black solid ",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{ color: "black", padding: "10px" }}
                      id={item["TEAM_ID"]}
                    >
                      {" "}
                      {item["NAME"]}{" "}
                    </div>{" "}
                    <button type="button" class="btn btn-dark disabled">
                      {" "}
                      Join{" "}
                    </button>{" "}
                  </div>
                );
              }
            } else {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottom: "1px black solid ",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{ color: "black", padding: "10px" }}
                    id={item["TEAM_ID"]}
                  >
                    {" "}
                    {item["NAME"]}{" "}
                  </div>{" "}
                  <button
                    type="button"
                    class="btn btn-dark "
                    onClick={(e) => {
                      handleJoinTeam(e, item["TEAM_ID"]);
                    }}
                  >
                    {" "}
                    Join{" "}
                  </button>{" "}
                </div>
              );
            }
          })}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
