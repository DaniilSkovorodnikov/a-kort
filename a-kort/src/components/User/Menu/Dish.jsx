import {useState} from "react";

export default function Dish({name, price, photo, description, setVisibleDishDesc, setCurrentDish ,addInCart}){
    const [visibleBtn, setVisibleBtn] = useState(false);
    const btnClasses = ["user-dish__btn"];
    if (visibleBtn){
        btnClasses.push("visible");
    }

    const [visibleDescription, setVisibleDescription] = useState(false);
    const descriptionClasses = ["user-dish__description"];
    if (visibleDescription){
        descriptionClasses.push("visible")
    }

    return (
        <li className="user-dish"
            onMouseEnter={() => {
                setVisibleBtn(true);
                setVisibleDescription(true);
            }}
            onMouseLeave={() => {
                setVisibleBtn(false);
                setVisibleDescription(false);
            }}
            onClick={() => {
                setCurrentDish({name, price, photo, description});
                setVisibleDishDesc(true);
            }}
        >
            <img src={photo} className="user-dish__photo" alt=""></img>
            <h2 className="user-dish__name">{name}</h2>
            <p className={descriptionClasses.join(' ')}>{description}</p>
            <p className="user-dish__price">{price} <span>&#8381;</span></p>
            <button
                className={btnClasses.join(' ')}
                onClick={(e) => {
                    e.stopPropagation();
                    addInCart({name, price});
                }}
            >В корзину</button>
        </li>
    )
}