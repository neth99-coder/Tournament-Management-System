import axios from "axios";
const API_URL = "http://localhost:3001/api/auth";

const signup = (userData) => {
  return axios.post(API_URL + "/signup", { userData }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const login = async (obj) => {
  return await axios.post(API_URL + "/login", obj).then((response) => {
    if (response.data.result) {
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
