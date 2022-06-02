import { React, useEffect, useState } from "react";
import Axios from "axios";
import authService from "../../services/auth.service";
import Card from "../organizeTournamentsPage/Card";
import { Link } from "react-router-dom";

const RegisteredTournaments = () => {
  const [tournaments, setTournaments] = useState(["empty"]);

  useEffect(() => {
    getTournamnets();
    // (tournaments.length === 0) ? document.getElementById("error-message").style.display="none": document.getElementById("tour-table").style.display="none";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getTournamnets() {
    let res = await Axios({
      url:
        "https://tournament-management-system-1.herokuapp.com/api/player/tournaments/" +
        authService.getUserID(),
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": authService.getUserToken(),
      },
    });

    setTournaments(res.data.result);
  }

  return (
    <div>
      {tournaments.length === 0 ? (
        <div
          className="alert alert-dark"
          role="alert"
          style={{ marginTop: "10%" }}
          id="error-message"
        >
          No Registered Tournaments Yet !!
        </div>
      ) : (
        <div className="row" id="tour-table" style={{ marginTop: "3%" }}>
          {tournaments?.map((cur, index) => {
            return (
              <div className="col-lg-3 col-md-4 col-ms-6" key={index}>
                <Link
                  to={`../tournament/${cur.PLAYER_ID}`}
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

export default RegisteredTournaments;
