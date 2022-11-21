import Header from "./MenuChanger/Header";
import {Link, Route, Routes} from "react-router-dom";
import MyRestaurants, {RestaurantContext} from "./MyRestaurants/MyRestaurants";
import MenuChanger from "./MenuChanger/MenuChanger";
import {useState} from "react";

export default function AdminPanel(){

    return (
            <div>
                <Header>
                    <li className="site-nav-item"><Link>Личный кабинет</Link></li>
                    <li className="site-nav__item"><Link to="/my-restaurants">Мои точки</Link></li>
                </Header>
                <Routes>
                    <Route path="/my-restaurants" element={<MyRestaurants/>}/>
                    <Route path="/menu-changer" element={<MenuChanger/>}/>
                </Routes>
            </div>
    );
}