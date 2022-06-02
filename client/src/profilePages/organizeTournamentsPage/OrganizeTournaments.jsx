import { React, useEffect, useState } from "react";
import Card from "./Card";
import Header from "./Header";
import { Link } from "react-router-dom";
// import TournamentModal from "./TournamentModal";
import Axios from "axios";
import authService from "../../services/auth.service";
import styles from "./OrganizeTournaments.module.css";

const OrganizeTournaments = (props) => {
  const [tournaments, setTournaments] = useState("");

  useEffect(() => {
    getTournamnets();
    // (tournaments.length === 0) ? document.getElementById("error-message").style.display="none": document.getElementById("tour-table").style.display="none";
  }, []);

  async function getTournamnets() {
    let res = await Axios({
      url:
        "https://tournament-management-system-1.herokuapp.com/api/organizer/tournaments/" +
        authService.getUserID(),
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": authService.getUserToken(),
      },
    });

    setTournaments(res.data.result);
    // console.log(res.data.result);
  }

  return (
    <div>
      <Header />
      {tournaments.length === 0 ? (
        <div
          className="alert alert-dark"
          role="alert"
          style={{ marginTop: "10%" }}
          id="error-message"
        >
          No Organized Tournaments Yet !!
        </div>
      ) : (
        <div className="row" id="tour-table">
          {tournaments?.map((cur, index) => {
            return (
              <div className="col-lg-3 col-md-4 col-ms-6" key={index}>
                <Link
                  to={`../tournament/${cur.ORGANIZER_ID}`}
                  state={{ obj: cur }}
                  key={index}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Card key={index} id={index} title={cur.NAME} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrganizeTournaments;
