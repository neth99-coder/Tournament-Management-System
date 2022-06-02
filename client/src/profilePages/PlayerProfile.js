/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../profilePages/styles/Playerprofilestyle.css";
import { useParams } from "react-router-dom";
import authService from "../services/auth.service";

function Playerprofile(props) {
  const [ID, setID] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [country, setCountry] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  // let location = useLocation();
  useEffect(() => {
    let token = authService.getUserToken();
    axios
      .get(
        "https://tournament-management-system-1.herokuapp.com/api/player/getProfile/" +
        authService.getUserID(),
        {
          headers: { "x-auth-token": token },
        }
      )
      .then((response) => {
        const data = response.data.result[0];
        setCountry(data["COUNTRY"]);
        setName(data["NAME"]);
        setEmail(data["EMAIL"]);
        setGender(!data["GENDER"] ? "Male" : "Female");
        setSelectedDate(new Date(data["DOB"]));
        setID(data["PLAYER_ID"]);
        // setProfilePic(data["profilePic"]["data"]);
      });
  }, []);

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
                <span className="font-weight-bold">{name}</span>
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
                    <label className="labels">Player ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="id"
                      value={ID || "PayerID"}
                      readOnly
                      required
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="enter email"
                      name="email"
                      value={email || ""}
                      onChange={(email) => {
                        setEmail(email);
                      }}
                      required
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="country"
                      name="country"
                      value={country || ""}
                      onChange={(country) => {
                        setCountry(country);
                      }}
                      required
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Gender</label>
                    <br />
                    <select
                      name="gender"
                      onChange={(gender) => {
                        setGender(gender);
                      }}
                      value={gender}
                      className="form-control"
                      required
                      readOnly
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="labels">Date of birth</label>
                  <DatePicker
                    className="form-control"
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                    placeholderText={"dd/mm/yyyy"}
                    maxDate={new Date()}
                    minDate={new Date("01/01/1950")}
                    name="dob"
                    required
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Playerprofile;
