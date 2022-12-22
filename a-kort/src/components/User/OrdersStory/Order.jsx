export default function Order(){
    return (
        <li className="user-orders__item">
            <div className="user-orders__order">
                <div className="user-orders__order-header">
                    <h2 className="user-orders__date">Заказ от 1 декабря</h2>
                    <div className="user-orders__info">
                        <p className="user-orders__location">ТРЦ Гринвич, 1 очередь</p>
                        <p className="user-orders__status">Готовится</p>
                    </div>
                    <div className="user-orders__number">№ 123456789</div>
                </div>
                <ul className="user-orders__dishes">
                    <li className="user-orders__dish">
                        <p className="user-orders__dish-name">Чизбургер</p>
                        <p className="user-orders__count">1 x 59 &#8381;</p>
                    </li>
                    <li className="user-orders__dish">
                        <p className="user-orders__dish-name">Чизбургер</p>
                        <p className="user-orders__count">1 x 59 &#8381;</p>
                    </li>
                    <li className="user-orders__dish">
                        <p className="user-orders__dish-name">Чизбургер</p>
                        <p className="user-orders__count">1 x 59 &#8381;</p>
                    </li>
                </ul>
                <div className="user-orders__total">
                    <p className="user-orders__total-title">Итого</p>
                    <p className="user-orders__total-price">307 &#8381;</p>
                </div>
            </div>
        </li>
    )
}