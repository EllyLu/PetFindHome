import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    window.alert("登出成功");
    navigate("/");
    setCurrentUser(null);
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#FFC77D" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span style={{ fontWeight: 'bold',fontFamily: "fantasy", fontSize: "24px", color: "#FFFAF2" }}>
              佩特找家
            </span>
            <span style={{ fontSize: "18px", color: "#FFECC9" }}>
              Pet Find Home
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto" style={{ linkColor: "red" }}>
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  主頁
                </Link>
              </li>
              {!currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    註冊
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    登入
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link" to="/">
                    登出
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/pets/userProfile">
                    個人檔案
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/pets">
                    領養
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/postPet">
                    刊登送養
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;
