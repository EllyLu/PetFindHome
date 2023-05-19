import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetService from "../services/pet.service";

const PetComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [isLoading, setIsLoading] = useState(true);
  const navgate = useNavigate();
  const handleTakeToLogin = () => {
    navgate("/login");
  };
  const handleTakeToPetProfile = (_id) => {
    console.log(_id);
    navgate("/pets/petProfile/" + _id);
  };

  let [petData, setPetData] = useState([]);
  useEffect(() => {
    console.log("Using effect in pets");

    PetService.getAllPet()
      .then((data) => {
        setPetData(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  //console.log(petData[3].image[0]);

  return (
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        {isLoading ? (
          <div>
            <p style={{ color: "orange", fontSize: "2rem" }}> Loading...</p>
          </div>
        ) : (
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {petData.map((pet, index) => (
              <div class="col" key={index}>
                <div class="card border-warning">
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <img
                    class="bd-placeholder-img card-img-top"
                    width="100%"
                    height="300"
                    src={`data:image/png;base64, ${pet.image[0]}`}
                  ></img>
                  <div class="card-body">
                    <h3 style={{ color: "orange" }}>{pet.name}</h3>
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
                          onClick={() => handleTakeToPetProfile(pet._id)}
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
        )}
      </div>
    </div>
  );
};

export default PetComponent;
