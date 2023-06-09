// 使用axios傳送response到server
import axios from "axios";
const API_URL = "https://pet-find-home-server.vercel.app/api/user";
//const API_URL = "http://localhost:8000/api/user";

class AuthService {
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    console.log(
      "getCurrentUser in auth.service \n",
      JSON.parse(localStorage.getItem("user"))
    );
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
