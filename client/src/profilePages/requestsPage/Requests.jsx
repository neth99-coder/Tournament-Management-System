import { React, useState, useEffect } from "react";
import Table from "./Table";
import Axios from "axios";
import authService from "../../services/auth.service";
const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    Axios.get("https://tournament-management-system-1.herokuapp.com/api/admin/requests", {
      headers: { "x-auth-token": authService.getUserToken() },
    }).then((res) => {
      //console.log(res.data);
      setRequests(res.data.result);
    });
  }, []);

  return (
    <div>
      <Table requests={requests}></Table>
    </div>
  );
};

export default Requests;
