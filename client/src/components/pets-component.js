import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetService from "../services/pet.service";

const PetComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [isLoading, setIsLoading] = useState(true);
  const navgate = useNavigate();
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


  return (
    <div>
      {!currentUser && (
        <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="d-flex align-items-center">
          <p
            style={{ color: "orange", fontSize: "2rem", marginRight: "10px" }}
          >
            您尚未登入
          </p>
        </div>
      </div>
      )}
      {currentUser && isLoading ? (
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
      ) : (
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {petData.map((pet, index) => (
                <div className="col" key={index}>
                  <div className="card border-warning">
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <img
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="300"
                      src={`data:image/png;base64, ${pet.image[0]}`}
                    ></img>
                    <div className="card-body">
                      <a
                        href={`pets/petProfile/${pet._id}`}
                        style={{ textDecorationColor: "orange" }}
                      >
                        <h3 style={{ color: "orange" }}>{pet.name}</h3>
                      </a>
                      <p className="card-text">年齡: {pet.age}</p>
                      <p className="card-text">品種: {pet.species}</p>
                      <p className="card-text">
                        {pet.description.substring(0, 18)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-warning"
                            onClick={() => handleTakeToPetProfile(pet._id)}
                          >
                            詳細資料
                          </button>
                        </div>
                        <small className="text-body-secondary">
                          {pet.date.substring(0, 10)}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetComponent;
