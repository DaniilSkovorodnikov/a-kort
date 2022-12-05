import '../styles/App.scss';
import React from "react";
import AdminPanel from "./Admin/AdminPanel";
import {Link, Route, Routes} from "react-router-dom";
import UserPanel from "./User/UserPanel";
import Login from "./Login";
import Registration from "./Registration";


export default function App() {
    return (
        <div className="App">
            {/*<Link to="user">Пользовательская сторона</Link>*/}
            {/*<Link to="admin">Админка</Link>*/}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/user/*" element={<UserPanel/>}/>
                <Route path="/admin/*" element={<AdminPanel/>}/>
            </Routes>
        </div>
    )
}

