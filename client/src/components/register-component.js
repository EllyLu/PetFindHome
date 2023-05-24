import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //可以返回其他頁面，類似redirect
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password)
    .then(() => {
      window.alert("註冊成功");
      navigate("/login");
    })
    .catch((err) => {
      console.log(err.response.data);
      setMessage(err.response.data);
    })
  }
 
  return (
    <div className="form-group p-5 mb-4 rounded-3 col-md-6">
      <div>
       {message && <div className="alert alert-danger"> {message} </div>}
       <div className="form-group">
          <label htmlFor="username">姓名</label>
          <input
           onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
           onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br></br>
        <button onClick={handleRegister} className="btn btn-primary btn-block">
          <span>註冊</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
