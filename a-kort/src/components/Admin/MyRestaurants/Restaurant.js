import {Link, Route, Routes} from "react-router-dom";
import React, {useContext} from "react";
import {RestaurantsContext} from "./MyRestaurants";

export default function Restaurant({name, location, id, setId}){
    const {restaurants, setCurrentRestaurant} = useContext(RestaurantsContext)

    return (
            <div className="restaurant">
                <div className="restaurant__about">
                    <h2 className="restaurant__name">{name}</h2>
                    <p className="restaurant__location">{location}</p>
                </div>
                <ul className="restaurant__links">
                    <Link onClick={setId(id)}>Перейти в панель заказов</Link>
                    <Link to="/menu-changer" onClick={setCurrentRestaurant(restaurants[id])}>Полное меню</Link>
                </ul>
            </div>
    );
}