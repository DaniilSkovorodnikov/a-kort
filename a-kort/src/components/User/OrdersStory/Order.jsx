export default function Order({date, location, number, dishes, totalPrice}){
    return (
        <li className="user-orders__item">
            <div className="user-orders__order">
                <div className="user-orders__order-header">
                    <h2 className="user-orders__date">{date}</h2>
                    <div className="user-orders__info">
                        <p className="user-orders__location">{location}</p>
                        <p className="user-orders__status">Готовится</p>
                    </div>
                    <div className="user-orders__number">Номер вашего заказа № {number}</div>
                </div>
                <ul className="user-orders__dishes">
                    {dishes.map((v,i) => <li className="user-orders__dish" key={i}>
                                            <p className="user-orders__dish-name">{v.name}</p>
                                            <p className="user-orders__count">{v.quantity} x {v.price} &#8381;</p>
                                        </li>)
                    }
                </ul>
                <div className="user-orders__total">
                    <p className="user-orders__total-title">Итого</p>
                    <p className="user-orders__total-price">{totalPrice} &#8381;</p>
                </div>
            </div>
        </li>
    )
}