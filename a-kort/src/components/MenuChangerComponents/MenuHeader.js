import CategoryAdder from "./CategoryAdder";
import React from "react";

export default function MenuHeader(){
    const [state, setState] = React.useState(false);

    return (
        <div className="menu-header">
            <div className="menu-header__about">
                <p className="menu-header__name">Название ресторана</p>
                <p className="menu-header__location">Место нахождения</p>
            </div>
            <button onClick={() => setState(true)} className="menu-header__add-btn">Добавить категорию</button>

        </div>
    );
}