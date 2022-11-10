import React from "react";

export default function MenuChangerHeader({setVisible}){
    return (
        <div className="menu-header">
            <div className="menu-header__about">
                <p className="menu-header__name">Название ресторана</p>
                <p className="menu-header__location">Место нахождения</p>
            </div>
            <button onClick={() => setVisible(true)} className="menu-header__add-btn">Добавить категорию</button>

        </div>
    );
}