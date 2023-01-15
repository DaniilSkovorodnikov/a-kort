import {useState} from "react";

export default function Order({date, location, number, dishes, totalPrice}){
    const [restaurants, setRestaurants] = useState([])
    function getRestaurants(dishes){
        for (const dish of dishes){
            if (!restaurants.includes(dish.restaurant)){
                setRestaurants([...restaurants, dish.restaurant])
            }
        }
    }

    getRestaurants(dishes)
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
                <ul className="user-orders__restaurants">
                    {restaurants.map((restaurant, index) => <li key={index}>
                        <h3>{restaurant}</h3>
                        <ul className="user-orders__dishes">
                            {dishes.map((v,i) => {
                                if (v.restaurant === restaurant){
                                    return <li className="user-orders__dish" key={i}>
                                        <p className="user-orders__dish-name">{v.name}</p>
                                        <p className="user-orders__count">{v.quantity} x {v.price} &#8381;</p>
                                    </li>
                                }
                            })}
                        </ul>
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