import React, { useState, useEffect } from "react";
import PetService from "../services/pet.service";
import AuthService from "../services/auth.service";

const UserProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [AddPetData, setAddPetData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Using effect in pets");

    PetService.getUserAddPet()
      .then((data) => {
        setAddPetData(data.data);
        //setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <p style={{ color: "orange", fontSize: "2rem" }}> 您尚未登入</p>
      )}
      {currentUser && (
        <div>
          <div class="row">
            <div class="col">
              <h3 style={{ fontWeight: "bold", color: "orange" }}>
                有興趣的寵物們:
              </h3>
            </div>
          </div>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-1">
            {AddPetData
              //.filter(pet => pet.adopters.indexOf(currentUser.user._id))
              .map((pet, index) => (
                <div class="col" key={index}>
                  <div class="card border-warning">
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <img
                      class="bd-placeholder-img card-img-top"
                      width="100%"
                      height="220"
                      src={`data:image/png;base64, ${pet.image[0]}`}
                    ></img>
                    <div class="card-body">
                      <a
                        href={`pets/petProfile/${pet._id}`}
                        style={{ textDecorationColor: "orange" }}
                      >
                        <h4 style={{ color: "orange" }}>{pet.name}</h4>
                      </a>
                      <p class="card-text">年齡: {pet.age}</p>
                      <p class="card-text">品種: {pet.species}</p>
                      <p class="card-text">
                        {pet.description.substring(0, 18)}...
                      </p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-sm btn-warning"
                            //onClick={() => handleTakeToPetProfile(pet._id)}
                          >
                            詳細資料
                          </button>
                        </div>
                        <small class="text-body-secondary">
                          {pet.date.substring(0, 10)}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileComponent;
