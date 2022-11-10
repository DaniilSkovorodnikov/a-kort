import '../styles/App.scss';
import MenuChanger from "./MenuChangerComponents/MenuChanger";
import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import Menu from "./Menu/Menu";

export default function App() {
  return (
    <div className="App">
        <ul>
            <Link to="/menu">Меню</Link>
            <Link to="/changer">Админка</Link>
        </ul>

      <Routes>
          <Route path={"/menu"} element={<Menu/>}/>
          <Route path="/changer" element={<MenuChanger/>}/>
      </Routes>
    </div>
  );
}

