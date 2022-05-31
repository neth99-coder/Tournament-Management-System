import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = "http://localhost:3001/api/auth";

const signup = (userData) => {
  return axios.post(API_URL + "/signup", { userData }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
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
const authService = {
  signup,
  logout,
  getCurrentUser,
  getUserID,
  getUserType,
};

export default authService;
