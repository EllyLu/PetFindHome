import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    window.alert("登出成功");
    navigate("/");
    setCurrentUser(null);
  }
  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#FFC77D"}}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav" style={{linkColor: "red"}}>
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    主頁
                  </Link>
                </li>
                {!currentUser && (
                  <div>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      註冊
                    </Link>
                  </li>
                </div>
                )}
                {!currentUser && (
                  <div>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      登入
                    </Link>
                  </li>
                </div>
                )}  
                {currentUser && (
                  <div>
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      登出
                    </Link>
                  </li>
                </div>
                )}
                {currentUser && (  
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
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
      </nav>
    </div>
  );
}
  

export default NavComponent;
