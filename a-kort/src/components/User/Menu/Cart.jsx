export default function Cart({dishes, sendOrder}){
    return (
        <div className="cart">
            <h2 className="cart__title">Корзина</h2>
            <ul className="cart__dishes">
                {dishes.map((v, i) => <li className="cart__dish" key={i}>
                    {v.name} - {v.price} <span>&#8381;</span>
                </li>)}
            </ul>
            <button className="cart__send-btn" onClick={() => sendOrder()}>Оформить заказ</button>
        </div>
    )
}