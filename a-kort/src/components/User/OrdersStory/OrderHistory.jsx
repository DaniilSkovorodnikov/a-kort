import UserHeader from "../UserHeader";
import "../../../styles/User/OrdersHistory.scss"
import Order from "./Order";
import {useEffect, useState} from "react";

async function getOrders(login){
    const data = await fetch(`http://26.87.4.182:8000/get_orders_by_user/?login=${login}`);
    const res = await data.json();
    return res;
}

export default function OrderHistory(){
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getOrders(sessionStorage.getItem('login'))
            .then((res) => setOrders([...res]))
    }, [])

    return (
        <div className="user-orders">
            <UserHeader/>
            <ul className={"user-orders__list"}>
                {orders.map((v,i) => <Order date={v.date}
                                                    location={v.location}
                                                    number={v.number}
                                                    dishes={v.dishes}
                                                    totalPrice={v.price}
                                                    key={i}/>)
                }
            </ul>
        </div>
    )
}