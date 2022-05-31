import { React, useState } from "react";
import Card from "./Card";
import Header from "./Header";
import { Link } from "react-router-dom";
// import TournamentModal from "./TournamentModal";
import Axios from "axios";
import authService from "../../services/auth.service";

const OrganizeTournaments = (props) => {
  const [tournaments, setTournaments] = useState([]);

  getTournamnets();

  async function getTournamnets() {
    let res = await Axios({
      url:
        "http://localhost:3001/api/organizer/tournaments/" +
        authService.getUserID(),
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTournaments(res.data.result);
  }

  return (
    <div>
      <Header />
      {tournaments.length === 0 ? (
        <div
          className="alert alert-dark"
          role="alert"
          style={{ marginTop: "10%" }}
        >
          {" "}
          No Organized Tournaments Yet !!
        </div>
      ) : (
        <div className="row">
          {tournaments?.map((cur, index) => {
            return (
              <div className="col-lg-3 col-md-4 col-ms-6">
                <Link
                  to={`../tournament/${cur.ORGANIZER_ID}`}
                  state={{ obj: cur }}
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
