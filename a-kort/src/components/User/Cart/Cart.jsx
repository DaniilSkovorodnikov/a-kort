import CartRestaurants from "./CartRestaurants";
import {useContext, useState} from "react";
import {CartContext} from "../UserPanel";
import Modal from "../../Admin/AdminMenu/Modal";



export default function Cart({cartDishes, sendOrder, clear}){
    const {cartSum} = useContext(CartContext)
    const [visible, setVisible] = useState(false)
    return (
            <div className="cart">
                <Modal visible={visible} setVisible={setVisible}>
                    <div className="cart-error">
                        <h2 className="cart-error__title">Ошибка!</h2>
                        <p className="cart-error__message">Пустая корзина</p>
                        <button className="cart-error__exit" onClick={() => setVisible(false)}>Закрыть</button>
                    </div>
                </Modal>
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
                <p className="cart__total-price">Общая стоимость: <span>{
                    cartSum
                } &#8381;</span></p>
                <button className="cart__send-btn" onClick={() => {
                    if (Object.keys(cartDishes).length === 0){
                        setVisible(true)
                    }
                    else {
                        sendOrder()
                    }
                }}>Оформить заказ</button>
            </div>
    )
}