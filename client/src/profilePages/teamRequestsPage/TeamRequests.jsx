import { React, useState, useEffect } from "react";
import Table from "./Table";
import Axios from "axios";
import authService from "../../services/auth.service";

const TeamRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    Axios.get(
      "http://localhost:3001/api/organizer/teamRequests/" +
        authService.getUserID(),
      {
        headers: { "x-auth-token": authService.getUserToken() },
      }
    ).then((res) => {
      //console.log(res.data);
      setRequests(res.data.result);
    });
  }, []);

  return (
    <div>
      <Table requests={requests}> </Table>{" "}
    </div>
  );
};

export default TeamRequests;
