import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import "./styles/navbarstyle.css";

import { Outlet } from "react-router-dom";
import Home from "../home/Home";
export default function HomeNavbar() {
  return (
    <div className="NavDiv">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ paddingLeft: 30 }}>
          <Nav.Link href="/"> IJ Games</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link
            to="/"
            className="navbar-brand"
            style={{ paddingLeft: 30 }}
          />
          <Nav className="ms-auto gap-0">
            <Nav.Link
              onClick={() => {
                document.querySelector(
                  ".signup-options-overlay"
                ).style.display = "block";
                document.querySelector(".signup-options").style.display =
                  "flex";
              }}
            >
              SIGN UP
            </Nav.Link>
          </Nav>
          <Nav className="ms">
            <Nav.Link href="login">LOGIN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <div
          className="signup-options-overlay"
          style={{
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            position: "absolute",
            backgroundColor: "black",
            opacity: "0.7",
            display: "none",
            zIndex: "3",
          }}
          onClick={() => {
            document.querySelector(".signup-options-overlay").style.display =
              "none";
            document.querySelector(".signup-options").style.display = "none";
          }}
        ></div>
        <Form
          className="signup-options"
          style={{
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            width: "300px",
            margin: "auto",
            marginTop: "200px",
            position: "absolute",
            color: "white",
            border: "white solid 1px",
            padding: "30px",
            paddingTop: "40px",
            height: "200px",
            backgroundColor: "black",
            borderRadius: "10px",
            opacity: "0.9",
            display: "flex",
            display: "none",
            flexDirection: "column",
            justifyContent: "space-around",
            zIndex: "3",
          }}
        >
          <button type="button" className="btn btn-outline-light">
            AS PLAYER
          </button>
          <button type="button" className="btn btn-outline-light">
            AS ORGANIZER
          </button>
        </Form>
      </div>
      <Outlet />
    </div>
  );
}
