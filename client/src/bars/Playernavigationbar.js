import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import "./styles/navbarstyle.css";
import { Outlet, Link } from "react-router-dom";
// import { Button } from "bootstrap";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Navigationbar(pros) {
  const navigate = useNavigate();
  return (
    <div className="NavDiv">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        {/* <Navbar.Brand style={{ paddingLeft: 30 }} href="dashboard">
          {pros.username} Dashboard
        </Navbar.Brand> */}
        <Link
          to="/player/dashboard"
          className="navbar-brand"
          style={{ paddingLeft: 30 }}
        >
          Dashboard
        </Link>
        <Link
          to="/player/tournaments"
          className="navbar-brand"
          style={{ paddingLeft: 30 }}
        >
          {pros.username} Tournaments
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="profile">Profile</Nav.Link>
            <Nav.Link href="profileSettings">Profile Settings</Nav.Link> */}
            <Link to="/player/profile" className="nav-link active">
              Profile
            </Link>
            <Link to="/player/profileSettings" className="nav-link active">
              Profile Settings
            </Link>
            {/* <Button className="nav-link active">Logout</Button> */}
          </Nav>
          <Button
            style={{ marginRight: "20px" }}
            className="ms-auto gap-0 btn-light"
            onClick={() => {
              authService.logout() && navigate("/login");
              window.location.reload(false);
            }}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default Navigationbar;
