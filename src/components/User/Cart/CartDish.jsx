import {useContext, useState} from "react";
import {CartContext} from "../UserPanel";


export default function CartDish({dishDesc, id}){
    const [count, setCount] = useState(dishDesc.count)
    const [totalPrice, setTotalPrice] = useState(dishDesc.totalPrice)
    const {cartSum, setCartSum} = useContext(CartContext)

    return (
        <li className="cart-dish">
            <p className="cart-dish__name">{dishDesc.dish.name}</p>
            <div className="cart-dish__right">
                <div className="cart-dish__count-changer">
                    <button className="cart-dish__decrement"
                            onClick={() => {
                                setCount(count - 1)
                                const cart = JSON.parse(sessionStorage.getItem('cart'));
                                const dish =  cart[`${dishDesc.restaurantName}, ${dishDesc.restaurantLocation}`][id]
                                dish.count--;
                                dish.totalPrice = dish.dish.price * dish.count;
                                setTotalPrice(dish.count * dishDesc.dish.price)
                                setCartSum(cartSum - dishDesc.dish.price)
                                sessionStorage.setItem('cart', JSON.stringify(cart))
                            }}
                    >-</button>
                    <p className="cart-dish__count">{count}</p>
                    <button className="cart-dish__increment"
                            onClick={() => {
                                setCount(count + 1)
                                const cart = JSON.parse(sessionStorage.getItem('cart'));
                                const dish = cart[`${dishDesc.restaurantName}, ${dishDesc.restaurantLocation}`][id]
                                dish.count++;
                                dish.totalPrice = dish.count * dishDesc.dish.price;
                                setTotalPrice(dish.count * dishDesc.dish.price)
                                setCartSum(cartSum + dishDesc.dish.price)
                                sessionStorage.setItem('cart', JSON.stringify(cart))
                            }}
                    >+</button>
                </div>
                <p className="cart-dish__price">{totalPrice} <span>&#8381;</span></p>
            </div>
        </li>
    )
}