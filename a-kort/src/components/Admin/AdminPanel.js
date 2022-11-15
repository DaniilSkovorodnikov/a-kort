import Header from "./MenuChanger/Header";
import {Link, Route, Routes} from "react-router-dom";
import MyRestaurants from "./MyRestaurants/MyRestaurants";
import MenuChanger from "./MenuChanger/MenuChanger";
import React, {useState} from "react";

export default function AdminPanel(){
    const [currentRestaurant, setCurrentRestaurant] = useState({});

    return (
            <div>
                <Header>
                    <li className="site-nav-item"><Link>Личный кабинет</Link></li>
                    <li className="site-nav__item"><Link to="/my-restaurants">Мои точки</Link></li>
                </Header>
                <Routes>
                    <Route path="/my-restaurants" element={<MyRestaurants setCurrentRestaurant={setCurrentRestaurant}/>}/>
                    <Route path="/menu-changer" element={<MenuChanger currentRestaurant={currentRestaurant}/>}/>
                </Routes>
            </div>
    );
}