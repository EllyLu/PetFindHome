import React, { useState, useEffect } from "react";
import PetService from "../services/pet.service";

const PetProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [petData, setPetData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentURL = window.location.pathname;
    const _id = currentURL.substring(
      currentURL.indexOf("Profile/") + "Profile".length + 1
    );
    console.log("Using effect in pets/petProfile");
    console.log("id: " + _id);
    PetService.getOnePet(_id)
      .then((data) => {
        setPetData(data.data);
        setIsLoading(false);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div class="album py-5 bg-body-tertiary">
        <div class="container">
          {isLoading ? (
            <div>
              <p style={{ color: "orange",fontSize:"2rem" }}></p>
            </div>
          ) : (
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div class="col">
                <div class="card border-warning">
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <img
                    class="bd-placeholder-img card-img-top"
                    width="100%"
                    height="300"
                    src={`data:image/png;base64, ${petData.image[0]}`}
                  ></img>
                  <div class="card-body">
                    <h3 style={{ color: "orange" }}>{petData.name}</h3>
                    <p class="card-text">年齡: {petData.age}</p>
                    <p class="card-text">品種: {petData.species}</p>
                    <p class="card-text">{petData.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-warning">
                          詳細資料
                        </button>
                      </div>
                      <small class="text-body-secondary">
                        {petData.date.substring(0, 10)}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetProfileComponent;
