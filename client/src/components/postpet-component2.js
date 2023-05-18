import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PetService from "../services/pet.service";

const PostPetComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [image, setImage] = useState([]);
  let [name, setName] = useState("");
  let [petType, setPetType] = useState("");
  let [age, setAge] = useState(0);
  let [species, setSpecies] = useState("");
  let [description, setDescription] = useState("");
  let [message, setMessage] = useState("");
  const navgate = useNavigate();
  const handleTakeToLogin = () => {
    navgate("/login");
  };
  const handleChangeImage = (e) => {
    setImage(e.target.value);
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
    PetService.post(image, name, age, petType, species, description)
      .then(() => {
        window.alert("新增成功");
        navgate("/pets");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div className="form-group">
        <div>
          <label htmlFor="images">選擇圖片：</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            value={image}
            className="form-control"
            style={{ width: "600px" }}
            multiple
            onChange={handleChangeImage}
          />
        </div>
 
        <div>
          <label htmlFor="name">名字：</label>
          <input
            type="text"
            id="name"
            value={name}
            className="form-control"
            style={{ width: "600px" }}
            onChange={handleChangeName}
          />
        </div>
        <div>
          <label htmlFor="petType">寵物類型：</label>
          <select
            id="petType"
            value={petType}
            className="form-control"
            style={{ width: "600px" }}
            onChange={handleChangePetType}
          >
            <option value="">請選擇</option>
            <option value="貓">貓</option>
            <option value="狗">狗</option>
          </select>
        </div>
        <div>
          <label htmlFor="age">年齡：</label>
          <input
            type="number"
            id="age"
            value={age}
            className="form-control"
            style={{ width: "600px" }}
            onChange={handleChangeAge}
          />
        </div>
        <div>
          <label htmlFor="species">品種：</label>
          <input
            type="text"
            id=""
            value={species}
            className="form-control"
            style={{ width: "600px" }}
            onChange={handleChangeSpecies}
          />
        </div>
        <div>
          <label htmlFor="description">介紹你的毛孩：</label>
          <textarea
            value={description}
            className="form-control"
            row="5"
            style={{ width: "600px" }}
            onChange={handleChangeDescription}
          />
        </div>
        <br />
          <button className="btn btn-primary" onClick={postPet}>
            Submit
          </button>
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

    //    {/* <div>
    //       {images.map((image) => (
    //         <img key={image} src={image} alt="Pet" style={{ width: "200px" }} />
    //       ))}
    //     </div> */}