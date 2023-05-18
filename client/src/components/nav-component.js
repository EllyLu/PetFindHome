import React from "react";
import { Link, useHistory } from "react-router-dom";

const NavComponent = (props) => {
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
                
                  <div>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        註冊
                      </Link>
                    </li>
                  </div>
                
                
                  <div>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        登入
                      </Link>
                    </li>
                  </div>
                
                
                  <div>
                    <li className="nav-item">
                      <Link  className="nav-link" to="#">
                        登出
                      </Link>
                    </li>
                  </div>
                
                
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      個人檔案
                    </Link>
                  </li>
                
                
                  <li className="nav-item">
                    <Link className="nav-link" to="/pets">
                      領養
                    </Link>
                  </li>
                
                
                  <li className="nav-item">
                    <Link className="nav-link" to="/postCourse">
                      刊登送養
                    </Link>
                  </li>
                
                
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
}
  

export default NavComponent;
