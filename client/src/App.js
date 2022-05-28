import "./App.css";
import Playerprofile from "./profilePages/PlayerProfile.js";
import AdminProfile from "./profilePages/AdminProfile.js";
import OrganizerProfile from "./profilePages/OrganizerProfile.js";
import UpdatePlayerProfile from "./profilePages/UpdatePlayerProfile.js";
import UpdateOrganizerProfile from "./profilePages/UpdateOrganizerProfile";
import UpdateAdminProfile from "./profilePages/UpdateAdminProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playernavigationbar from "./bars/Playernavigationbar";
import Organizernavigationbar from "./bars/Organizernavigationbar";
import Adminnavigationbar from "./bars/Adminnavigationbar";
import Dashboard from "./profilePages/Dashboard";
import Requests from "./profilePages/requestsPage/Requests";
import TeamRequests from "./profilePages/teamRequestsPage/TeamRequests";
import OrganizeTournaments from "./profilePages/organizeTournamentsPage/OrganizeTournaments";
import OrganizedTournament from "./profilePages/organizeTournamentsPage/OrganizedTournament";
import Home from "./home/Home";
import TournamentPage from "./home/TournamentPage";
import HomeNavbar from "./bars/HomeNavbar";
import Login from "./loginPage/loginPage";
import { useEffect, useState } from "react";
import AuthService from "./services/auth.service";

function App() {
  // const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    // const user = AuthService.getCurrentUser();
    AuthService.login({
      email: "hasitha.19@cse.mrt.ac.lk",
      password: "12345",
      type: 0,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeNavbar />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/tournamentPage" element={<TournamentPage />} />
        <Route exact path="player" element={<Playernavigationbar />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Playerprofile />} />

          <Route
            exact
            path="profileSettings"
            element={<UpdatePlayerProfile />}
          />
        </Route>
        <Route path="organizer" element={<Organizernavigationbar />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<OrganizerProfile />} />
          <Route path="tournaments" element={<OrganizeTournaments />} />
          <Route path="tournament/:userid" element={<OrganizedTournament />} />
          <Route path="teamrequests" element={<TeamRequests />} />
          <Route
            exact
            path="profileSettings"
            element={<UpdateOrganizerProfile />}
          />
        </Route>

        <Route path="admin" element={<Adminnavigationbar />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="requests" element={<Requests />} />
          <Route
            exact
            path="profileSettings"
            element={<UpdateAdminProfile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
