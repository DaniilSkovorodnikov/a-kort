import "../../styles/User/Restaurants.scss"
import {Route, Routes} from "react-router-dom";
import Menu from "./Menu/Menu";
import FoodcourtRestaurants from "./Restaurants/FoodcourtRestaurants";
import {createContext, useState} from "react";

export const UserContext = createContext();

export default function UserPanel(){
    const [currentRestaurant, setCurrentRestaurant] = useState("");

    return (
    <UserContext.Provider value={{currentRestaurant ,setCurrentRestaurant}}>
        <div>
            <Routes>
                <Route path="/" element={<FoodcourtRestaurants/>}/>
                <Route path="/restaurant" element={<Menu/>}/>
            </Routes>
        </div>
    </UserContext.Provider>
        )
}