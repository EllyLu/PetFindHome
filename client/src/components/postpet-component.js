import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PetService from "../services/pet.service";

const PostPetComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [images, setImages] = useState([]);
  let [name, setName] = useState("");
  let [petType, setPetType] = useState("");
  let [age, setAge] = useState(0);
  let [species, setSpecies] = useState("");
  let [description, setDescription] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePetType = (e) => {
    setPetType(e.target.value);
  };

  const handleChangeSpecies = (e) => {
    setSpecies(e.target.value);
  };

  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const postPet = () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    formData.append("name", name);
    formData.append("age", age);
    formData.append("petType", petType);
    formData.append("species", species);
    formData.append("description", description);

    PetService.post(formData)
      .then(() => {
        window.alert("新增成功");
        navigate("/pets");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div className="form-group p-5 mb-4 rounded-3 col-md-6">
        <div>
          <label htmlFor="images">選擇圖片：</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            className="form-control"
            multiple
            onChange={handleChangeImages}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="name">名字：</label>
          <input
            type="text"
            id="name"
            value={name}
            className="form-control"
            // style={{ width: "400px" }}
            onChange={handleChangeName}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="petType">寵物類型：</label>
          <select
            id="petType"
            value={petType}
            className="form-control"
            // style={{ width: "400px" }}
            onChange={handleChangePetType}
          >
            <option value="">請選擇</option>
            <option value="貓">貓</option>
            <option value="狗">狗</option>
          </select>
        </div>
        <br></br>
        <div>
          <label htmlFor="species">品種：</label>
          <input
            type="text"
            id="species"
            value={species}
            className="form-control"
            // style={{ width: "400px" }}
            onChange={handleChangeSpecies}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="age">年齡：</label>
          <input
            type="number"
            id="age"
            value={age}
            className="form-control"
            // style={{ width: "400px" }}
            onChange={handleChangeAge}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="description">描述：</label>
          <textarea
            id="description"
            value={description}
            className="form-control"
            // style={{ width: "400px", height: "150px" }}
            onChange={handleChangeDescription}
          />
        </div>
        <br></br>
        <div>
          <button className="btn btn-primary" onClick={postPet}>
            新增寵物
          </button>
        </div>
        <br />
        <br />
        {message && (
          <div className="alert alert-warning" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPetComponent;
