import React, { useState, useEffect } from "react";
import PetService from "../services/pet.service";

const UserProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [AddPetData, setAddPetData] = useState([]);
  let [PostPetData, setPostPetData] = useState([]);
  let [AddPetIsLoading, setAddPetIsLoading] = useState(true);
  let [PostPetIsLoading, setPostPetIsLoading] = useState(true);

  const handleRemoveAddPet = (index, pet_id, user_id) => {
    PetService.removeAddPet(pet_id, user_id)
      .then(() => {
        window.alert("已從清單中移除");
        AddPetData.splice(index, 1);

        setAddPetData((prevData) => {
          const newData = [...prevData];
          newData.splice(index, 1);
          return newData;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePostPet = (index, pet_id, sender_id) => {
    if (
      window.confirm("確定刪除該筆資料嗎? 請注意，刪除後將不會出現在領養頁面")
    ) {
      PetService.deletePostPet(pet_id, sender_id)
        .then(() => {
          window.alert("已刪除資料");
          AddPetData.splice(index, 1);

          setPostPetData((prevData) => {
            const newData = [...prevData];
            newData.splice(index, 1);
            return newData;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log("Using effect in pets");

    PetService.getUserAddPet()
      .then((data) => {
        setAddPetData(data.data);
        setAddPetIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    PetService.getUserPostPet()
      .then((data) => {
        setPostPetData(data.data);
        setPostPetIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container pt-5">
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
      {currentUser && AddPetIsLoading && PostPetIsLoading && (
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
      {!AddPetIsLoading && !PostPetIsLoading && currentUser && (
        <div>
          <div className="row">
            <h3 style={{ fontWeight: "bold", color: "orange" }}>
              你有興趣的寵物:
            </h3>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">圖片</th>
                <th scope="col">名稱</th>
                <th scope="col">年齡</th>
                <th scope="col">品種</th>
                <th scope="col">送養人資訊</th>
                <th
                  className="d-none d-md-inline"
                  style={{ borderBottom: "none" }}
                  scope="col"
                >
                  發佈日期
                </th>
                <th></th>
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
                  <td>
                    <p className="d-none d-md-inline">
                      {pet.date.substring(0, 10)}
                    </p>
                  </td>
                  <td>
                    <button
                      className="btn btn-link"
                      onClick={() => handleRemoveAddPet(index, pet._id)}
                    >
                      <p>刪除</p>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <h3 style={{ fontWeight: "bold", color: "orange" }}>
              你發佈的寵物:
            </h3>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">圖片</th>
                <th scope="col">名稱</th>
                <th scope="col">年齡</th>
                <th scope="col">品種</th>
                <th className="hide-on-sm" scope="col">
                  發佈日期
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {PostPetData.map((pet, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="bd-placeholder-img"
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
                  <td>
                    <a
                      href="#"
                      onClick={() =>
                        handleDeletePostPet(index, pet._id, pet.sender)
                      }
                    >
                      <p>刪除</p>
                    </a>
                  </td>
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
