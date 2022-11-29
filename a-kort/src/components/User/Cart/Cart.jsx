import CartRestaurants from "./CartRestaurants";
import {useEffect, useState} from "react";

export default function Cart({cartDishes, sendOrder, clear}){
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
    }, [])

    return (
        <div className="cart">
            <div className="cart__header">
                <h2 className="cart__title">Корзина</h2>
                <button className="cart__clear-btn" onClick={() => {clear()}}>Очистить корзину</button>
            </div>
            <ul className="cart__restaurants">
                {
                    Object.keys(cartDishes).length > 0 ?
                        Object.keys(cartDishes).map((v,i) => <CartRestaurants restaurant={v}
                                                                              dishes={cartDishes[v]}
                                                                              key={i}
                        />) :
                        <p>Пусто</p>
                }
            </ul>
            <button className="cart__send-btn" onClick={() => sendOrder()}>Оформить заказ</button>
        </div>
    )
}