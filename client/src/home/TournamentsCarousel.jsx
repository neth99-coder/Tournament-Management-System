import { React, useEffect, useState } from "react";
import TournamentCard from "./TournamentCard";
import { Carousel, Spinner } from "react-bootstrap";
import axios from "axios";
import authService from "../services/auth.service";
import { useMediaQuery } from 'react-responsive'



export default function TournamentsCarousel() {
  const [tournamentArray, setTournamentArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tournaments, setTournaments] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://tournament-management-system-1.herokuapp.com/tournaments", {
        headers: { "x-auth-token": authService.getUserToken() },
      })
      .then(function (response) {
        // handle success
        // response.data.result


        setTournaments(response.data.result);
        const temp_arr=response.data.result;
        var tournament_arr = [];

        const chunkSize = 4;
        for (let i = 0; i < temp_arr.length; i += chunkSize) {
          const chunk = response.data.result.slice(i, i + chunkSize);
          tournament_arr.push(chunk);
        }
        setTournamentArray(tournament_arr);
    
        setIsLoading(false);
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
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <></>
      )}
      <Carousel style={{ height: "400px", padding: "30px" }}>
        {" "}

        {useMediaQuery({ query: '(min-width: 700px)' }) && tournamentArray.map((i) => {
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
                  // console.log(j.REGISTER);
                  return <TournamentCard data={j} />;
                })}{" "}
              </div>{" "}
            </Carousel.Item>
          );
        })}
        {useMediaQuery({ query: '(max-width: 700px)' }) && tournaments.map((i) => {
          return (
            <Carousel.Item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >

                <TournamentCard data={i} />

              </div>
            </Carousel.Item>
          )
        })


        }



      </Carousel>
    </div>
  );
}
