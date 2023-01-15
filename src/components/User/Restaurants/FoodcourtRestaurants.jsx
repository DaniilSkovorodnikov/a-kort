import UserRestaurant from "./UserRestaurant";
import UserHeader from "../UserHeader";
import {useEffect, useState} from "react";
import Map from "./FoodcourtMap";
import Modal from "../../Admin/AdminMenu/Modal";
import FoodcourtMap from "./FoodcourtMap";

async function getRestaurants(foodcourtName) {
    const data = await fetch(`https://web-production-c5b9.up.railway.app/get_foodcourt_restaurants/?name=${foodcourtName}`);
    const res = await data.json();
    return [...res["restaurants"]]
}

async function getFoodcourts(){
    const data = await fetch("https://web-production-c5b9.up.railway.app/get_foodcourts/");
    const res = await data.json();
    return [...res["foodcourts"]]
}

export default function FoodcourtRestaurants(){
    const [foodcourt, setFoodcourt] = useState(sessionStorage.getItem("currentFoodcourt"));
    const [restaurants, setRestaurants] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [foodcourts, setFoodcourts] = useState([]);
    useEffect(() => {
        getFoodcourts().then((res) => {
            setFoodcourts(res)
        })
    }, [])

    useEffect(() => {
        getRestaurants(foodcourt)
            .then((v) => {
                setRestaurants([...v])
                setFiltered([...v])
            })
    }, [foodcourt])

    const [visible, setVisible] = useState(true)

    return(<div>
        {!foodcourt ?
        <Modal visible={visible} setVisible={() => {
            setVisible(false)
        }}>
            <div className="map" onClick={(event) => event.stopPropagation()}>
                <h2 className="map__title">Выберите фудкорт</h2>
                <div className="map__changer">
                    { foodcourts.length > 0 ? <FoodcourtMap positions={foodcourts} setCurrentFoodcourt={setFoodcourt} setVisible={setVisible}/> : <div/>}
                </div>
            </div>
        </Modal> : <div/>}
        <UserHeader toFilter={restaurants} setFiltered={setFiltered} isFilterDishes={false}>
            <button className="user-header__change-foodcourt" onClick={() => {
                setFoodcourt("")
                setVisible(true)
            }}>Выбрать фудкорт</button>
        </UserHeader>
        <ul className="restaurants">
            {filtered.map((v, i) => <UserRestaurant name={v.name}
                                                    rating={v.rating}
                                                    location={v.location}
                                                    photo={`https://web-production-c5b9.up.railway.app/get_image/?image=${v.img}`}
                                                    key={i}
            />)}
        </ul>
    </div>);
}