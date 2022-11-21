import {Routes} from "react-router-dom";
import UserHeader from "./UserHeader";
import UserRestaurant from "./UserRestaurant";
import "../../styles/User/Restaurants.scss"
import {useState} from "react";

async function getRestaurants(foodcourtName){
    const data = await fetch(`http://127.0.0.1:8000/get_foodcourt_restaurants/?name=${foodcourtName}`);
    const res = await data.json();
    return [...res["restaurants"]]
}

export default function UserPanel(){
    const [foodcourt, setFoodcourt] = useState("");
    const [restaurants, setRestaurants] = useState([])

    return (<div>
        <UserHeader>
            <select
                className="restaurant-adder__location"
                onChange={(e) => {
                    setFoodcourt(e.target.value);
                    getRestaurants(e.target.value)
                        .then((v) => setRestaurants([...v]));
                }}
                defaultValue=""
            >
                <option hidden value="">Адрес</option>
                <option>Гринвич</option>
                <option>Мега</option>
                <option>Парк Хаус</option>
            </select>
        </UserHeader>

        <ul className="restaurants">
            {restaurants.map((v) => <UserRestaurant name={v.name}
                                                      rating={v.rating}
                                                      photo={`http://127.0.0.1:8000/get_image/?image=${v.img}`}
            />)}
        </ul>
    </div>)
}