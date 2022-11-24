import "../../../styles/Admin/Orders.scss"
import {useState} from "react";

export default function Orders(){
    const [currentRestaurant] = useState(JSON.parse(sessionStorage.getItem("currentRestaurant")))

    return (
        <div className="orders">
            <div className="orders__header">
                <h2 className="orders__restaurant-name">{currentRestaurant.name}</h2>
                <p className="orders__restaurant-location">{currentRestaurant.location}</p>
            </div>
        </div>
    )
}