import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar ,Button} from "react-bootstrap";
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
        <Link
          to="dashboard"
          className="navbar-brand"
          style={{ paddingLeft: 30 }}
        >
          {pros.username} Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="profile">Profile</Nav.Link>
            <Nav.Link href="profileSettings">Profile Settings</Nav.Link>
            <Nav.Link href="requests">Organizer Requests</Nav.Link> */}
            <Link to="profile" className="nav-link active">
              Profile
            </Link>
            <Link to="profileSettings" className="nav-link active">
              Profile Settings
            </Link>
            <Link to="requests" className="nav-link active">
              Organizer Requests
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

export default Adminnavigationbar;
