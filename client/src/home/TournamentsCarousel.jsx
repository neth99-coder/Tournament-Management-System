import { React, useEffect, useState } from "react";
import TournamentCard from "./TournamentCard";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import authService from "../services/auth.service";

export default function TournamentsCarousel() {
  const [tournamentArray, setTournamentArray] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/tournaments", {
        headers: { "x-auth-token": authService.getUserToken() },
      })
      .then(function (response) {
        // handle success
        const tournaments = response.data.result;
        var tournament_arr = [];

        const chunkSize = 4;
        for (let i = 0; i < tournaments.length; i += chunkSize) {
          const chunk = tournaments.slice(i, i + chunkSize);
          tournament_arr.push(chunk);
        }
        setTournamentArray(tournament_arr);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          color: "white",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "large",
          padding: "10px",
        }}
      >
        UPCOMING TOURNAMENTS{" "}
      </div>{" "}
      <Carousel style={{ height: "400px", padding: "30px" }}>
        {" "}
        {tournamentArray.map((i) => {
          return (
            <Carousel.Item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {" "}
                {i.map((j) => {
                  return <TournamentCard data={j} />;
                })}{" "}
              </div>{" "}
            </Carousel.Item>
          );
        })}{" "}
      </Carousel>{" "}
    </div>
  );
}
