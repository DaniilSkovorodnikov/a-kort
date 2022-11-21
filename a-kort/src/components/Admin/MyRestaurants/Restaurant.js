import {Link} from "react-router-dom";
import React from "react";

export default function Restaurant({name, location, id, restaurants}){

    return (
            <div className="restaurant">
                <div className="restaurant__about">
                    <h2 className="restaurant__name">{name}</h2>
                    <p className="restaurant__location">{location}</p>
                </div>
                <ul className="restaurant__links">
                    <Link>Перейти в панель заказов</Link>
                    <Link to="/menu-changer" onClick={() => sessionStorage.setItem('currentRestaurant',
                        JSON.stringify({name, location}))}>Полное меню</Link>
                </ul>
            </div>
    );
}