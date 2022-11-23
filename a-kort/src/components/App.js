import '../styles/App.scss';
import React from "react";
import AdminPanel from "./Admin/AdminPanel";
import {Link, Route, Routes} from "react-router-dom";
import Menu from "./User/Menu/Menu";
import UserPanel from "./User/UserPanel";


export default function App() {
    return (
        <div className="App">
            <Link to="user">Пользовательская сторона</Link>
            <Link to="admin">Админка</Link>
            <Routes>
                <Route path="/user/*" element={<UserPanel/>}/>
                <Route path="/admin/*" element={<AdminPanel/>}/>
            </Routes>
        </div>
    )
}

