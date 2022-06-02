import {React} from "react";
import HomeNavbar from "../bars/HomeNavbar";
import authService from "../services/auth.service";
import Playernavigationbar from "../bars/Playernavigationbar"
import Organizernavigationbar from "../bars/Organizernavigationbar"
import Adminnavigationbar from "../bars/Adminnavigationbar"

import TournamentsCarousel from "./TournamentsCarousel";

export default function Home(){
    return(
        <div>
            {/* <HomeNavbar /> */
         !authService.getCurrentUser() && <HomeNavbar /> 
    }
            <TournamentsCarousel/>
            {/* <TournamentPage/> */}

        </div>
    )
}