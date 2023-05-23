import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import PetComponent from "./components/pets-component";
import PostPetComponent from "./components/postpet-component";
import PetProfileComponent from "./components/petProfile-component";
import AuthService from "./services/auth.service";

function App() {
  let [ currentUser, setCurrentUser ] = useState(AuthService.getCurrentUser());
  
  return (
  <BrowserRouter>
   <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    <Routes>
      <Route exact path="/" element={<HomeComponent/>}/>
      <Route exact path="/register" element={<RegisterComponent/>}/>
      <Route exact path="/login" element={<LoginComponent 
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      />}/>
      <Route exact path="/pets" element={<PetComponent
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      />}/>
      <Route exact path="/postPet" element={<PostPetComponent
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      />}/>
      <Route exact path="/pets/petProfile/:id" element={<PetProfileComponent
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
