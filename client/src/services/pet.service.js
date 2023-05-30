import axios from "axios";
//const API_URL = "https://pet-find-home-server.vercel.app/api/pets";
const API_URL = "http://localhost:8000/api/pets";

class PetService {
  getAllPet() {
    let token;
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      params,
      headers: {
        Authorization: token,
      },
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
      },
    });
  }

  getUserAddPet() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/userProfile/addPet", {
      headers: {
        Authorization: token,
      },
    });
  }

  getUserPostPet() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/userProfile/postPet", {
      headers: {
        Authorization: token,
      },
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
    });
  }

  deletePostPet(pet_id, sender_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(
      `${API_URL}/userProfile/deletePostPet/${pet_id}/${sender_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  addAdopter(pet_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL + "/petProfile/" + pet_id, user_id, {
      headers: {
        Authorization: token,
      },
    });
  }

  removeAddPet(pet_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/userProfile/removeAddPet",
      { pet_id, user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new PetService();
