import {useState} from "react";

export default function Category({name, setVisible}){
    return(
        <div className="category">
            <div className="category__header">
                <h2 className="category__name">{name}</h2>
                <button onClick={() => setVisible(true)} className="category__add-btn">Добавить блюдо</button>
            </div>
            <ul className="category__dishes">

            </ul>
        </div>
    )
}