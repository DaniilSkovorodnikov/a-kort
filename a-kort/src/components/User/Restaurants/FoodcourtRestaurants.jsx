import UserRestaurant from "./UserRestaurant";
import UserHeader from "../UserHeader";
import {useEffect, useState} from "react";
import Map from "./FoodcourtMap";
import Modal from "../../Admin/AdminMenu/Modal";
import FoodcourtMap from "./FoodcourtMap";

async function getRestaurants(foodcourtName) {
    const data = await fetch(`http://26.87.4.182:8000/get_foodcourt_restaurants/?name=${foodcourtName}`);
    const res = await data.json();
    return [...res["restaurants"]]
}

async function getFoodcourts(){
    const data = await fetch("http://26.87.4.182:8000/get_foodcourts/");
    const res = await data.json();
    return [...res["foodcourts"]]
}

export default function FoodcourtRestaurants(){
    const [foodcourt, setFoodcourt] = useState(sessionStorage.getItem("currentFoodcourt"));
    const [restaurants, setRestaurants] = useState([]);
    const [foodcourts, setFoodcourts] = useState([]);
    useEffect(() => {
        getFoodcourts().then((res) => {
            setFoodcourts(res)
        })
    }, [])

    useEffect(() => {
        getRestaurants(foodcourt)
            .then((v) => setRestaurants([...v]))
    }, [foodcourt])

    const [visible, setVisible] = useState(true)

    return(<div>
        <Modal visible={visible} setVisible={setVisible}>
            <div className="map" onClick={(event) => event.stopPropagation()}>
                <h2 className="map__title">Выберите фудкорт</h2>
                <div className="map__changer">
                    {foodcourts.length > 0 ? <FoodcourtMap positions={foodcourts} setCurrentFoodcourt={setFoodcourt} setVisible={setVisible}/> : <div/>}
                </div>
            </div>
        </Modal>
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
                {foodcourts.map((v,i) => <option key={i}>{v.name}</option>)}
            </select>
        </UserHeader>
        <ul className="restaurants">
            {restaurants.map((v, i) => <UserRestaurant name={v.name}
                                                    rating={v.rating}
                                                    location={v.location}
                                                    photo={`http://127.0.0.1:8000/get_image/?image=${v.img}`}
                                                    key={i}
            />)}
        </ul>
    </div>);
}