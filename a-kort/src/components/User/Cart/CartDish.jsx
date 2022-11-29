import {useState} from "react";

export default function CartDish({dishDesc, id}){
    const [count, setCount] = useState(dishDesc.count)

    return (
        <li className="cart-dish">
            <p className="cart-dish__name">{dishDesc.dish.name}</p>
            <div className="cart-dish__right">
                <div className="cart-dish__count-changer">
                    <button className="cart-dish__decrement"
                            onClick={() => {
                                setCount(count - 1)
                                const cart = JSON.parse(sessionStorage.getItem('cart'));
                                cart[`${dishDesc.restaurantName}, ${dishDesc.restaurantLocation}`][id].count--;
                                sessionStorage.setItem('cart', JSON.stringify(cart))
                            }}
                    >-</button>
                    <p className="cart-dish__count">{count}</p>
                    <button className="cart-dish__increment"
                            onClick={() => {
                                setCount(count + 1)
                                const cart = JSON.parse(sessionStorage.getItem('cart'));
                                cart[`${dishDesc.restaurantName}, ${dishDesc.restaurantLocation}`][id].count++;
                                sessionStorage.setItem('cart', JSON.stringify(cart))
                            }}
                    >+</button>
                </div>
                <p className="cart-dish__price">{dishDesc.dish.price} <span>&#8381;</span></p>
            </div>
        </li>
    )
}