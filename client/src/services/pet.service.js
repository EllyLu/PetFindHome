import axios from "axios";
const API_URL = "https://pet-find-home-server.vercel.app/api/pets";
//const API_URL = "http://localhost:8000/api/pets";

class PetService {
    getAllPet() {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        
        return axios.get(API_URL, {
            headers: {
                Authorization: token,
            }
        });
    }

    getOnePet(_id) {
      let token;
      if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
      } else {
          token = "";
      }
      
      return axios.get(API_URL + "/petProfile/" + _id, {
          headers: {
              Authorization: token,
          }
      });
  }

    post(formData) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.post(API_URL + "/postPet", formData, {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          })
      }
}

export default new PetService();