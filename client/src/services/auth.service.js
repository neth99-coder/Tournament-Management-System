import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = "https://tournament-management-system-1.herokuapp.com/api/auth";

const signup = (userData) => {
  return axios.post(API_URL + "/signup", { userData }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", response.data);
    }
    return response.data;
  });
};

const getCurrentUser = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

const getUserID = () => {
  if (localStorage.getItem("user")) {
    const { ID } = jwt_decode(localStorage.user);
    return ID;
  }
  return null;
};

const getUserType = () => {
  if (localStorage.getItem("user")) {
    const { type } = jwt_decode(localStorage.user);
    return type;
  }
  return null;
};

const logout = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
    return true;
  }
  return false;
};
const getUserToken = () => {
  if (localStorage.getItem("user")) {
    return localStorage.getItem("user");
  }
  return null;
};
const authService = {
  signup,
  logout,
  getCurrentUser,
  getUserID,
  getUserType,
  getUserToken,
};

export default authService;
