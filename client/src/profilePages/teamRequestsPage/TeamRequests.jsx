import { React, useState, useEffect } from "react";
import Table from "./Table";
import Axios from "axios";
import authService from "../../services/auth.service";
import { Spinner } from "react-bootstrap";
const TeamRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    Axios.get(
      "https://tournament-management-system-1.herokuapp.com/api/organizer/teamRequests/" +
      authService.getUserID(),
      {
        headers: { "x-auth-token": authService.getUserToken() },
      }
    ).then((res) => {
      //console.log(res.data);
      setRequests(res.data.result);
      setIsLoading(false)
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <><Table requests={requests}> </Table>{" "}</>
      )}
    </div>
  );
};

export default TeamRequests;
