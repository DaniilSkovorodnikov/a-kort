import UserRestaurant from "./UserRestaurant";
import UserHeader from "../UserHeader";
import {useEffect, useState} from "react";

async function getRestaurants(foodcourtName) {
    const data = await fetch(`http://127.0.0.1:8000/get_foodcourt_restaurants/?name=${foodcourtName}`);
    const res = await data.json();
    return [...res["restaurants"]]
}

export default function FoodcourtRestaurants(){
    const [foodcourt, setFoodcourt] = useState(sessionStorage.getItem("currentFoodcourt"));
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        getRestaurants(foodcourt)
            .then((v) => setRestaurants([...v]));
    }, [foodcourt])

    return(<div>
        <UserHeader>
            <select
                className="restaurant-adder__location"
                onChange={(e) => {
                    setFoodcourt(e.target.value);
                    sessionStorage.setItem("currentFoodcourt", e.target.value);
                }}
                defaultValue={foodcourt}
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
                                                    location={v.location}
                                                    photo={`http://127.0.0.1:8000/get_image/?image=${v.img}`}
            />)}
        </ul>
    </div>);
}