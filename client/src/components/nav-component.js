import React, { useState } from "react";
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
        style={{ backgroundColor: "#FFB450" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span
              style={{
                fontWeight: "bold",
                fontFamily: "fantasy",
                fontSize: "24px",
                color: "#FFFAF2",
              }}
            >
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
                <Link
                  className="nav-link active"
                  style={{ color: "#FFFFFF" }}
                  to="/"
                >
                  主頁
                </Link>
              </li>
              {!currentUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={{ color: "#FFFFFF" }}
                    to="/register"
                  >
                    註冊
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={{ color: "#FFFFFF" }}
                    to="/login"
                  >
                    登入
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link
                    onClick={handleLogout}
                    style={{ color: "#FFFFFF" }}
                    className="nav-link"
                    to="/"
                  >
                    登出
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={{ color: "#FFFFFF" }}
                    to="/pets/userProfile"
                  >
                    毛孩檔案
                  </Link>
                </li>
              )}
              {currentUser && (
                // <li>
                //   <button
                //     class="navbar-toggler"
                //     type="button"
                //     data-bs-toggle="collapse"
                //     data-bs-target="#navbarNavDarkDropdown"
                //     aria-controls="navbarNavDarkDropdown"
                //     aria-expanded="false"
                //     aria-label="Toggle navigation"
                //   >
                //     <span class="navbar-toggler-icon"></span>
                //   </button>
                //   <div
                //     class="collapse navbar-collapse"
                //     id="navbarNavDarkDropdown"
                //   >
                //     <ul class="navbar-nav">
                //       <li class="nav-item dropdown">
                //         <a
                //           class="nav-link dropdown-toggle"
                //           href="/pets"
                //           id="navbarDarkDropdownMenuLink"
                //           role="button"
                //           data-bs-toggle="dropdown"
                //           aria-expanded="false"
                //           style={{ color: "#FFFFFF" }}
                //         >
                //           領養
                //         </a>
                //         <ul class="dropdown-menu dropdown-menu-end">
                //           <li>
                //             <a class="dropdown-item" href="/pets?petType=貓">
                //               貓
                //             </a>
                //           </li>
                //           <li>
                //             <a class="dropdown-item" href="/pets?petType=狗">
                //               狗
                //             </a>
                //           </li>
                //         </ul>
                //       </li>
                //     </ul>
                //   </div>
                // </li>
                <li class="nav-item dropdown">
  <Link
    class="nav-link dropdown-toggle"
    id="navbarDarkDropdownMenuLink"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ color: "#FFFFFF" }}
    to="/pets"  // 修改此處為領養列表的路由 URL
  >
    領養
  </Link>
  <ul class="dropdown-menu dropdown-menu-end">
    <li>
      <a class="dropdown-item" style={{color:"#FFB450"}} href="/pets?petType=貓">
        貓
      </a>
    </li>
    <li>
      <a class="dropdown-item"  style={{color:"#FFB450"}} href="/pets?petType=狗">
        狗
      </a>
    </li>
  </ul>
</li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: "#FFFFFF" }} to="/postPet">
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
