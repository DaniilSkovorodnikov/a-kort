import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {UserContext} from "../../User/UserPanel";

export default function AdminRestaurant({name, location}){
    return (
            <div className="admin-restaurant">
                <div className="admin-restaurant__about">
                    <h2 className="admin-restaurant__name">{name}</h2>
                    <p className="admin-restaurant__location">{location}</p>
                </div>
                <ul className="admin-restaurant__links">
                    <Link className="admin-restaurant__link">Перейти в панель заказов</Link>
                    <Link to="/admin/menu-changer"
                          onClick={() => sessionStorage.setItem('currentRestaurant', JSON.stringify({name, location}))}
                          className="admin-restaurant__link"
                    >Полное меню</Link>
                </ul>
            </div>
    );
}