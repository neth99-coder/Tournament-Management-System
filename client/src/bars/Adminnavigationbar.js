import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav, Navbar ,Button} from "react-bootstrap";
import "./styles/navbarstyle.css";
import { Outlet, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
function Adminnavigationbar(pros) {
  const navigate = useNavigate();
  return (
    <div className="NavDiv">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        {/* <Navbar.Brand style={{ paddingLeft: 30 }} href="dashboard">
          {pros.username} Dashboard
        </Navbar.Brand> */}
        <Link to="/admin" className="navbar-brand" style={{ paddingLeft: 30 }}>
          {pros.username} Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto navbar-links">
            {/* <Nav.Link href="profile">Profile</Nav.Link>
            <Nav.Link href="profileSettings">Profile Settings</Nav.Link>
            <Nav.Link href="requests">Organizer Requests</Nav.Link> */}
            <Link to="/admin/profile" className="nav-link active">
              Profile
            </Link>
            <Link to="/admin/profileSettings" className="nav-link active">
              Profile Settings
            </Link>
            <Link to="/admin/requests" className="nav-link active">
              Organizer Requests
            </Link>
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

export default Adminnavigationbar;
