import "../../../styles/Admin/Orders.scss"
import {useEffect, useState} from "react";
import Order from "./Order";

async function getOrders(restaurantName, restaurantLocation){
    const data = await fetch(`http://26.87.4.182:8000/get_orders_by_restaurant/?name=${restaurantName}&location=${restaurantLocation}`);
    const res = await data.json();
    return res;
}

export default function Orders(){
    const [currentRestaurant] = useState(JSON.parse(sessionStorage.getItem("currentRestaurant")))
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders(currentRestaurant.name, currentRestaurant.location)
            .then((res) => setOrders(res));
    }, []);

    return (
        <div className="orders">
            <div className="orders__header">
                <h2 className="orders__restaurant-name">{currentRestaurant.name}</h2>
                <p className="orders__restaurant-location">{currentRestaurant.location}</p>
            </div>
            <ul className="orders__list">
                {orders.map((v,i) => <Order id={v.number} dishes={v.dishes} key={i}/>)}
            </ul>
        </div>
    )
}