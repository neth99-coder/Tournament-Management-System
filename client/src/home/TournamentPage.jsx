import axios from "axios";
import { React, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles/tournament-card.css";
import HomeNavbar from "../bars/HomeNavbar";
import { useLocation } from "react-router-dom";


export default function TournamentPage(props) {
    
    const [team,setTeam]=useState('');
    
    const location = useLocation();

    

    const handleSubmit =(event)=>{
        event.preventDefault();
        axios.post('http://localhost:3001/teamreq', {
            playerID: 2,
            tournamentID: location.state.TOURNAMENT_ID,
            teamName:team
          })
          .then((response) => {
            alert("Team Create Request Sent!");
            window.location.reload();
            
          }, (error) => {
            console.log(error);
          });
    }


    return (
    <div>
      <HomeNavbar/>

      <div
        className="tournament-page-bg"
        style={{
          top: "80px",
          bottom: "0",
          left: "0",
          right: "0",
          width: "100%",
          height: "500px",
          backgroundImage: 'url("https://wallpaperaccess.com/full/7448.png")',
          position: "absolute",
          opacity: "0.25",
          pointerEvents: "none",
        }}
      ></div>
      <div
        className="tournament-container"
        style={{
          padding: "40px",
          marginTop: "20px",
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
              <td>Name</td>
              <td>{location.state.NAME}</td>
            </tr>
            <tr>
              <td>Organizer</td>
              <td>{location.state.ORGANIZER}</td>
            </tr>
            <tr>
              <td>Game</td>
              <td>{location.state.GAME}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{location.state.DATE}</td>
            </tr>
            <tr>
              <td>Start </td>
              <td>{location.state.TIME}</td>
            </tr>
            <tr>
              <td>Registeration Closing</td>
              <td>{location.state.REG_CLOSE}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <button type="button" className="btn btn-outline-light">
            REGISTER NOW
          </button>
          <button type="button" className="btn btn-outline-light" onClick={()=>{
              document.querySelector(".create-team-form-overlay").style.display='block';
              document.querySelector(".create-team-form").style.display='block';}
          }>
            CREATE TEAM
          </button>
        </div>
      </div>
      <div
        className="create-team-form-overlay"
        style={{
          top: "0",
          bottom: "0",
          right: "0",
          left: "0",
          position: "absolute",
          backgroundColor: "black",
         
          opacity:"0.5",
          display:"none",
        }}
        onClick={()=>{ document.querySelector(".create-team-form-overlay").style.display='none';
        document.querySelector(".create-team-form").style.display='none';}}
      >
    </div>
        <Form className="create-team-form"
        style={{
          top: "0",
          bottom: "0",
          right: "0",
          left: "0",
          width: "300px",
          margin: "auto",
          marginTop: "200px",
          position: "absolute",
          color: "white",
          border: "white solid 1px",
          padding: "30px",
          paddingTop: "40px",
          height: "300px",
          backgroundColor: "black",
          borderRadius:"10px",
          opacity:"0.9",
          display:"none"
          
        }} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter team name"
              required
              onChange={(e)=>{setTeam(e.target.value);}}
              style={{ backgroundColor: "black", color: "white" }}
            />
          </Form.Group>

          <div style={{ textAlign: "center", paddingTop: "40px" }}>
            <Button
              variant="outline-dark"
              style={{ color: "white", borderColor: "white" }}
              onClick={(e)=>{
                if(team!=''){
                  handleSubmit(e)
                }
                else{
                  alert("team name cannot be empty")
                }
                
              }}
              
            >
              Submit
            </Button>
          </div>
        </Form>
    </div >
  );
}
