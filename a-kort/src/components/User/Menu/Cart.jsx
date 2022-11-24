export default function Cart({cartDishes, sendOrder, clear}){

    return (
        <div className="cart">
            <div className="cart__header">
                <h2 className="cart__title">Корзина</h2>
                <button className="cart__clear-btn" onClick={() => {clear()}}>Очистить корзину</button>
            </div>

            <ul className="cart__dishes">
                {
                    cartDishes.length > 0 ?
                        cartDishes.map((v, i) => <li className="cart__dish" key={i}>
                            {v.dish.name} - {v.dish.price} <span>&#8381;</span> - {v.count} - {v.restaurantName}</li>) :
                        <p>Пусто</p>
                }
            </ul>
            <button className="cart__send-btn" onClick={() => sendOrder()}>Оформить заказ</button>
        </div>
    )
}