import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service";


const LoginComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navgate = useNavigate();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    AuthService.login(email, password)
    .then((res) => {
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));

      }
      setCurrentUser(AuthService.getCurrentUser());
      navgate("/");
      
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      setMessage(err.response.data);
    })
  }
  return (
    <div className="form-group p-5 mb-4 rounded-3 col-md-6">
      <div>
        {(message) && <div className="alert alert-danger"> {message} </div>}
        <div className="form-group">
          <label htmlFor="username">Email</label>
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
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>登入</span>
          </button>
        </div>
      </div>
    </div>
  );
}
  

export default LoginComponent;
