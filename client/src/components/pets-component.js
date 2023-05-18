import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetService from "../services/pet.service";

const PetComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const navgate = useNavigate();
    const handleTakeToLogin = () => {
        navgate("/login");
    };
    
    let [petData, setPetData] = useState([]);
    useEffect(() => {
        console.log("Using effect");
        
        PetService.getAllPet()
        .then((data) => {
            setPetData(data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        
    }, []);
 
    //console.log(petData[3].image[0]);

    return (
        
        <div>
            { 
              petData.map(pet => (
                <div class = "col-md-6">
                  <div class="media media-events-list bg-primary">
                    <img src={`data:image/png;base64, ${pet.image[0]}`} alt="寵物"></img>
                  </div>
                  <ul class="list-unstyled mb-2">
                    <li class="text-white mb-1">
                      <i class="fa fa-vcard mr-2" aria-hidden="true"></i>{pet.petType}
                    </li>
                    <li class="text-white mb-1">
                      <i class="fa fa-bookmark mr-2" aria-hidden="true"></i>{pet.name}
                    </li>
                  </ul>    
                </div>  
                
              ))
            }
        </div>
    )
}

/* <div class="col-md-6">
        <div class="media media-events-list bg-primary">
          
            <img src="https://wepet.tw/storage/adopt/adopt_230517124441873013377_2692498681.jpg" alt="領養狗-吉事堡">
          
      
          <div class="media-body">
            <h3 class="media-heading mt-3 mb-2 ml-3">
              <a class="text-white text-capitalize d-block text-truncate" href="https://wepet.tw/領養資訊-230517124441873013377">吉事堡</a>
            </h3>
      
            <ul class="list-unstyled mb-2">
              <li class="text-white mb-1">
                <i class="fa fa-vcard mr-2" aria-hidden="true"></i>狗
              </li>
              <li class="text-white mb-1">
                <i class="fa fa-bookmark mr-2" aria-hidden="true"></i>公
              </li>
              <li class="text-white mb-1">
                <i class="fa fa-home mr-2" aria-hidden="true"></i>高雄市
              </li>
              <li class="text-white mb-1">
                <i class="fa fa-paw mr-2" aria-hidden="true"></i>幼年小型土狗
              </li>

            </ul>
      
            <p class="text-white mb-5">流浪母狗生的小狗！其他被人領養走剩一隻虎斑公狗出生2022/..</p>
            <div class="mb-1">
              <a href="https://wepet.tw/領養資訊-230517124441873013377" class="btn btn-white btn-xs btn-block text-uppercase text-hover-success">詳細</a>
            </div>            
          </div>
        </div>
      </div> */


export default PetComponent;