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
}

export default new PetService();