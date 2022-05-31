import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar ,Button} from "react-bootstrap";
import "./styles/navbarstyle.css";
import { Outlet, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
function Organizernavigationbar(pros) {
  const navigate = useNavigate();
  return (
    <div className="NavDiv">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        {/* <Navbar.Brand style={{ paddingLeft: 30 }} href="dashboard">
          {pros.username} Dashboard
        </Navbar.Brand> */}
        <Link to="" className="navbar-brand" style={{ paddingLeft: 30 }}>
          {pros.username} Tournaments
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto ">
            {/* <Nav.Link href="profile">Profile</Nav.Link>
            <Nav.Link href="profileSettings">Profile Settings</Nav.Link>
            <Nav.Link href="teamrequests">Team Requests</Nav.Link>
            <Nav.Link href="tournaments"> Tournaments</Nav.Link> */}
            <Link to="profile" className="nav-link active">
              Profile
            </Link>
            <Link to="profileSettings" className="nav-link active">
              Profile Settings
            </Link>
            <Link to="teamrequests" className="nav-link active">
              Team Requests
            </Link>
            <Link to="tournaments" className="nav-link active">
              Tournaments
            </Link>
            <Button
              style={{ float: "right", right: "0" }}
              className="ms-auto gap-0"
              onClick={() => {
                authService.logout() && navigate("/login");
              }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Organizernavigationbar;
