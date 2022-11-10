import '../styles/App.scss';
import MenuChanger from "./MenuChangerComponents/MenuChanger";
import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import Menu from "./Menu/Menu";

export default function App() {
  return (
    <div className="App">
      <Menu/>
    </div>
  );
}

