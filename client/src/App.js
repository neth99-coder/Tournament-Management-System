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
import Requests from "./profilePages/requestsPage/Requests";
import TeamRequests from "./profilePages/teamRequestsPage/TeamRequests";
import OrganizeTournaments from "./profilePages/organizeTournamentsPage/OrganizeTournaments";
import OrganizedTournament from "./profilePages/organizeTournamentsPage/OrganizedTournament";
import Home from "./home/Home";
import TournamentPage from "./home/TournamentPage";
import HomeNavbar from "./bars/HomeNavbar";
import Login from "./loginPage/loginPage";
import RegisteredTournaments from "./profilePages/RegisterdTournaments/RegisteredTournaments";
import { useEffect, useState } from "react";
import NoPage from "./NoPage/NoPage";
// import AuthService from "./services/auth.service";
import Signup from "./signupPage/signupPage";
import jwt_decode from "jwt-decode";
function App() {
  // const [currentUser, setCurrentUser] = useState(undefined);

  const [ID, setID] = useState("");
  const [type, setUserType] = useState("");

  useEffect(() => {
    if (localStorage.user) {
      const { ID, type } = jwt_decode(localStorage.user);
      setID(ID);
      setUserType(type);
    }
    console.log("App is Running");
  }, [setID, setUserType]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeNavbar />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="/tournamentPage" element={<TournamentPage />} />
        {type === 0 ? (
          <Route exact path="player" element={<Playernavigationbar />}>
            <Route path="" element={<Home />} />
            <Route path="tournaments" element={<RegisteredTournaments />} />
            <Route path="profile" element={<Playerprofile id={ID} />} />
            <Route
              path="tournament/:userid"
              element={<OrganizedTournament />}
            />

            <Route
              exact
              path="profileSettings"
              element={<UpdatePlayerProfile />}
            />
          </Route>
        ) : type === 1 ? (
          <Route path="organizer" element={<Organizernavigationbar />}>
            <Route path="" element={<Home />} />
            <Route path="profile" element={<OrganizerProfile />} />
            <Route path="tournaments" element={<OrganizeTournaments />} />
            <Route
              path="tournament/:userid"
              element={<OrganizedTournament />}
            />
            <Route path="teamrequests" element={<TeamRequests />} />
            <Route
              exact
              path="profileSettings"
              element={<UpdateOrganizerProfile />}
            />
          </Route>
        ) : type === 2 ? (
          <Route path="admin" element={<Adminnavigationbar />}>
            <Route path="" element={<AdminProfile />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="requests" element={<Requests />} />
            <Route
              exact
              path="profileSettings"
              element={<UpdateAdminProfile />}
            />
          </Route>
        ) : (
          <Route path="*" element={<NoPage />} />
        )}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// function MakeNavigation() {
//   let navigate = useNavigate();
//   return <div></div>;
// }

export default App;
