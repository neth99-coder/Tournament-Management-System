/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from "../bars/Adminnavigationbar";
import "react-datepicker/dist/react-datepicker.css";
import axios, { Axios } from "axios";
import { Modal, Button, Form, Alert,Spinner } from "react-bootstrap";
import authService from "../services/auth.service";
function AlertBox(props) {
  if (props.props) {
    return (
      <>
        <Alert show={true}>The password you entered is incorrect</Alert>
      </>
    );
  }
}
function Example(props) {
  const [show, setShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formError, setFormError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  function validate() {
    if (currentPassword === "" || newPassword === "") {
      setError(true);
    } else {
      const pattern = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/;
      if (
        !new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        ).test(newPassword)
      ) {
        setFormError({
          password:
            "Minimum eight characters, at least one letter and one number:",
        });
        setIsSubmit(false);
      } else {
        setFormError({ password: "" });
        setIsSubmit(true);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const passwords = { ID: props.ID, currentPassword, newPassword };
    validate();
    if (isSubmit === true) {
      axios
        .post(
          "https://tournament-management-system-1.herokuapp.com/api/admin/confirmPasswords",
          passwords,
          {
            headers: { "x-auth-token": authService.getUserToken() },
          }
        )
        .then((response) => {
          if (!response.data.success) {
            setError(true);
          } else {
            handleClose();
            window.location.reload(false);
          }
        });
    } else {
    }
  }

  return (
    <>
      <Button
        variant="primary"
        type="button"
        className="btn btn-primary profile-button"
        onClick={handleShow}
      >
        Update Password Here
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AlertBox props={error} />
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type Current Password Here"
                value={currentPassword}
                required
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setError(false);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type New Password Here"
                autoFocus
                value={newPassword}
                required
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit} type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
            <p>{formError.password}</p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

function UpdateAdminProfile() {
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const res = axios
      .get(
        "https://tournament-management-system-1.herokuapp.com/api/admin/getProfile/" +
          authService.getUserID(),
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      )
      .then((response) => {
        const data = response.data.result[0];
        setName(data["NAME"]);
        setEmail(data["EMAIL"]);
        setID(data["ADMIN_ID"]);
        setIsLoading(false);
      });
  }, [ID]);

  function validate(key) {
    // if (key === "name") {
    //   if (name.length === 0) {
    //     setFormError({ name: "Name should have a value" });
    //   }
    // } else if (key === "email") {
    //   const pattern =
    //     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //   if (!pattern.test(email)) {
    //     setFormError({ email: "Email is incorrect" });
    //   }
    // }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var key = event.target[0].name;

    var putData;
    switch (key) {
      case "name":
        putData = { ID, name };
        break;
      case "email":
        putData = { ID, email };
        break;

      default:
        break;
    }

    if (putData !== undefined) {
      axios
        .put(
          "https://tournament-management-system-1.herokuapp.com/api/admin/updateProfile",
          putData,
          {
            headers: { "x-auth-token": authService.getUserToken() },
          }
        )
        .then((response) => {
          window.location.reload(false);
        });
    }
  };
  return (
    <div>
      {/* <Navigationbar username={name} /> */}
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
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
                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row mt-2">
                    <div className="col-md-5">
                      <label className="labels">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={name || ""}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="col-md-5">
                      <br />
                      <button
                        className="btn btn-primary profile-button"
                        name="updateName"
                        type="submit"
                      >
                        Update Here
                      </button>
                    </div>

                    <div className="col-md-2">
                      <br />
                    </div>
                  </div>
                </form>
                {/* <form onSubmit={handleSubmit}>
                  <div className="row mt-2">
                    <div className="col-md-5">
                      <label className="labels">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={email || ""}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="col-md-5">
                      <br />
                      <button
                        className="btn btn-primary profile-button"
                        name="updateEmail"
                        type="submit"
                      >
                        Update Here
                      </button>
                    </div>

                    <div className="col-md-2">
                      <br />
                    </div>
                  </div>
                </form> */}

                <form>
                  <div className="row mt-2">
                    <div className="col-md-5">
                      {/* <label className="labels">Password</label> */}
                      {/* <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={""}
                        required
                        readOnly
                      /> */}
                    </div>
                    <div className="col-md-5">
                      <br />
                      <Example ID={ID} />
                    </div>
                    <div className="col-md-2">
                      <br />
                      <p>{}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateAdminProfile;
