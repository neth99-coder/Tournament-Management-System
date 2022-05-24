import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import "./styles/navbarstyle.css";
import { Outlet } from "react-router-dom";

export default function HomeNavbar() {
  return (
    <div className="NavDiv">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ paddingLeft: 30 }} >
           IJ Games
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="mr-auto" style={{paddingLeft:"80vw"}}>
            <Nav.Link href="login" >LOGIN</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}


