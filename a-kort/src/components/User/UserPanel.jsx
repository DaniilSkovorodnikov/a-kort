import "../../styles/User/Restaurants.scss"
import {Route, Routes} from "react-router-dom";
import Menu from "./Menu/Menu";
import FoodcourtRestaurants from "./Restaurants/FoodcourtRestaurants";
import {createContext, useState} from "react";


export default function UserPanel(){

    return (
        <div>
            <Routes>
                <Route path="/" element={<FoodcourtRestaurants/>}/>
                <Route path="/restaurant" element={<Menu/>}/>
            </Routes>
        </div>
        )
}