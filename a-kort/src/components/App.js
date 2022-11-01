import '../styles/App.scss';
import Header from "./Header";
import MenuChanger from "./MenuChangerComponents/MenuChanger";
import React from "react";

export default function App() {
  return (
    <div className="App">
      <Header />
      <MenuChanger/>
    </div>
  );
}

