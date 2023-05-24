import React, { useState, useEffect } from "react";
import PetService from "../services/pet.service";

const UserProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [AddPetData, setAddPetData] = useState([]);
  let [PostPetData, setPostPetData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isScreenSmall, setIsScreenSmall] = useState(false);


  useEffect(() => {
    console.log("Using effect in pets");

    PetService.getUserAddPet()
      .then((data) => {
        setAddPetData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    PetService.getUserPostPet()
      .then((data) => {
        setIsLoading(false);
        setPostPetData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="container pt-5">
      {!currentUser && (
        <p style={{ color: "orange", fontSize: "2rem" }}> 您尚未登入</p>
      )}
      {isLoading && (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="d-flex align-items-center">
            <p
              style={{ color: "orange", fontSize: "2rem", marginRight: "10px" }}
            >
              Loading...
            </p>
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {!isLoading && currentUser && (
        <div>
          <div class="row">
            <h3 style={{ fontWeight: "bold", color: "orange" }}>
              有興趣的寵物們:
            </h3>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">圖片</th>
                <th scope="col">名稱</th>
                <th scope="col">年齡</th>
                <th scope="col">品種</th>
                <th scope="col">送養人資訊</th>
                <th className="d-none d-md-inline" style={{ borderBottom: "none" }} scope="col">發佈日期</th>
              </tr>
            </thead>
            <tbody>
              {AddPetData.map((pet, index) => (
              
                <tr key={index}>
                  <td>
                    <img
                      className="bd-placeholder-img"
                      width="100"
                      height="100"
                      src={`data:image/png;base64, ${pet.image[0]}`}
                      alt=""
                    />
                    
                  </td>
                  <td>
                    <a
                      href={`petProfile/${pet._id}`}
                      style={{ textDecorationColor: "orange" }}
                    >
                      <p style={{ color: "orange" }}>{pet.name}</p>
                    </a>
                  </td>
                  <td>{pet.age}</td>
                  <td>{pet.species}</td>
                  <td>
                    <p>
                      姓名: {pet.sender.username}
                      <br />
                      Email: {pet.sender.email}
                    </p>
                  </td>
                  <td ><p className="d-none d-md-inline">{pet.date.substring(0, 10)}</p></td>
                </tr>
                
              ))}
            </tbody>
            
          </table>
          <div class="row">
            <h3 style={{ fontWeight: "bold", color: "orange" }}>
              你發佈的寵物們:
            </h3>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">圖片</th>
                <th scope="col">名稱</th>
                <th scope="col">年齡</th>
                <th scope="col">品種</th>
                <th className="hide-on-sm" scope="col">發佈日期</th>
              </tr>
            </thead>
            <tbody>
              {PostPetData.map((pet, index) => (
                <tr key={index}>
                  <td>
                    <img
                      class="bd-placeholder-img"
                      width="100"
                      height="100"
                      src={`data:image/png;base64, ${pet.image[0]}`}
                      alt=""
                    ></img>
                  </td>
                  <td>
                    <a
                      href={`petProfile/${pet._id}`}
                      style={{ textDecorationColor: "orange" }}
                    >
                      <p style={{ color: "orange" }}>{pet.name}</p>
                    </a>
                  </td>
                  <td>{pet.age}</td>
                  <td>{pet.species}</td>
                  <td>{pet.date.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProfileComponent;
