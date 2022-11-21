import AdminHeader from "./AdminHeader";
import {Link, Route, Routes} from "react-router-dom";
import AdminRestaurants from "./MyRestaurants/AdminRestaurants";
import MenuChanger from "./MenuChanger/MenuChanger";

export default function AdminPanel(){

    return (
            <div>
                <AdminHeader>
                    <li className="site-nav-item"><Link>Личный кабинет</Link></li>
                    <li className="site-nav__item"><Link to="my-restaurants">Мои точки</Link></li>
                </AdminHeader>
                <Routes>
                    <Route path="my-restaurants" element={<AdminRestaurants/>}/>
                    <Route path="menu-changer" element={<MenuChanger/>}/>
                </Routes>
            </div>
    );
}