import "bootstrap/dist/css/bootstrap.min.css";
import "../profilePages/styles/Organizerprofilestyle.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "../services/auth.service";
function Organizerprofile() {


  const [ID, setID] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://tournament-management-system-1.herokuapp.com/api/organizer/getProfile/" +
        authService.getUserID(),
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then((response) => {
        const data = response.data.result[0];
        setName(data["NAME"]);
        setEmail(data["EMAIL"]);
        setID(data["ORGANIZER_ID"]);
      });
  }, [ID, name, email]);

  return (
    <>
      {/* <Navigationbar username={name} /> */}
      <form>
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  alt="OK"
                />
                <span className="font-weight-bold">Edogaru</span>
                {/* <span className="text-black-50">edogaru@mail.com.my</span> */}
                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={name || ""}
                      required
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Organizer ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="id"
                      value={ID || "P0001"}
                      readOnly
                      required
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="enter email"
                      name="email"
                      value={email || ""}
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default Organizerprofile;
