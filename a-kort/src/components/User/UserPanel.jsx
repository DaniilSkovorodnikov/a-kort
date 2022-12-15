import "../../styles/User/Restaurants.scss"
import {Route, Routes} from "react-router-dom";
import Menu from "./Menu/Menu";
import FoodcourtRestaurants from "./Restaurants/FoodcourtRestaurants";
import {createContext, useEffect, useState} from "react";

export const CartContext = createContext()

export default function UserPanel(){
    const [cartSum, setCartSum] = useState(0)

    return (
        <CartContext.Provider value={{cartSum, setCartSum}}>
            <Routes>
                <Route path="/" element={<FoodcourtRestaurants/>}/>
                <Route path="/restaurant" element={<Menu/>}/>
            </Routes>
        </CartContext.Provider>
        )
}