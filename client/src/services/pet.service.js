import axios from "axios";
const API_URL = "http://localhost:8000/api/pets";

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

    // post(image, name, age, petType, species, description) {
    //     let token;
    //     if (localStorage.getItem("user")) {
    //         token = JSON.parse(localStorage.getItem("user")).token;
    //     } else {
    //         token = "";
    //     }
    //     return axios.post(
    //         API_URL + "/postPet",
    //         { image, name, age, petType, species, description },
    //         {
    //             headers: {
    //                 Authorization: token,
    //             }
    //         }
    //     )
    // }
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