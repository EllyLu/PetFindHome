import React, { useState, useEffect } from "react";
import PetService from "../services/pet.service";
import petService from "../services/pet.service";

const PetProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [petData, setPetData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [addState, setAddState] = useState("有興趣");
  const handleChangeAdd = (pet_id,user_id) => {
    setAddState("已添加");
    PetService.addAdopter(pet_id,user_id);
    
  }
  useEffect(() => {
    const currentURL = window.location.pathname;
    const _id = currentURL.substring(
      currentURL.indexOf("Profile/") + "Profile".length + 1
    );
    console.log("Using effect in pets/petProfile");

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
    <div className="container py-5">
      {isLoading ? (
        <div>
          <p style={{ color: "orange", fontSize: "2rem" }}></p>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
              style={{ width: "100%", height: "100%" }}
            >
              <div className="carousel-inner">
                {petData.image.map((OneImage, index) => (
                  <div
                    className={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                    key={index}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <img
                      src={`data:image/png;base64, ${OneImage}`}
                      className="d-block w-100 img-fluid"
                      alt="..."
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    ></img>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="container">
              <table
                className="table"
                style={{
                  borderRadius: "10px",
                  border: "2px solid #FFB450",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th
                      colSpan="2"
                      className="text-center"
                      style={{
                        fontSize: "150%",
                        fontWeight: "bold",
                        color: "white",
                        backgroundColor: "#FFB450",
                      }}
                    >
                      {petData.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-25">物種</td>
                    <td className="w-75" colSpan="2">
                      {petData.petType}
                    </td>
                  </tr>
                  <tr>
                    <td>品種</td>
                    <td colSpan="2">{petData.species}</td>
                  </tr>
                  <tr>
                    <td>年齡</td>
                    <td colSpan="2">{petData.age}</td>
                  </tr>
                  <tr>
                    <td>送養人</td>
                    <td colSpan="2">{petData.sender.username}</td>
                  </tr>
                  <tr>
                    <td>送養人信箱</td>
                    <td colSpan="2">{petData.sender.email}</td>
                  </tr>
                  <tr>
                    <td>介紹</td>
                    <td colSpan="2">{petData.description}</td>
                  </tr>
                </tbody>
              </table>
              {petData.adopters.indexOf(currentUser.user._id) == -1 && (
                <button
                  type="button"
                  class="btn"
                  onClick={() => handleChangeAdd(petData._id,currentUser.user._id)}
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "#FFB450",
                    float: "right",
                  }}
                >
                  {addState}
                </button>
              )}
              {petData.adopters.indexOf(currentUser.user._id) !== -1 && (
                <button
                  type="button"
                  class="btn"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "#FFB450",
                    float: "right",
                  }}
                >
                  已添加
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetProfileComponent;
