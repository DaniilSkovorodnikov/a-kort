import UserRestaurant from "./UserRestaurant";
import UserHeader from "../UserHeader";
import {useState} from "react";

async function getRestaurants(foodcourtName) {
    const data = await fetch(`http://127.0.0.1:8000/get_foodcourt_restaurants/?name=${foodcourtName}`);
    const res = await data.json();
    return [...res["restaurants"]]
}

export default function FoodcourtRestaurants(){
    const [foodcourt, setFoodcourt] = useState("");
    const [restaurants, setRestaurants] = useState([])

    return(<div>
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
                                                    location={v.location}
                                                    photo={`http://127.0.0.1:8000/get_image/?image=${v.img}`}
            />)}
            <UserRestaurant name={"БК"} rating={4.5} photo={""} location={"Парк Хаус"}/>
        </ul>
    </div>);
}