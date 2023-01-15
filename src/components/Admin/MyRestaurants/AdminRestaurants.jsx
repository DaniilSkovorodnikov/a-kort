import "../../../styles/Admin/MyRestaurants.scss"
import MenuHeader from "../AdminMenu/MenuHeader";
import AdminRestaurant from "./AdminRestaurant";
import {useEffect, useState} from "react";
import Modal from "../AdminMenu/Modal";

async function getRestaurants(){
    const data = await fetch(`https://web-production-c5b9.up.railway.app/get_all_restaurants`);
    const res = await data.json();
    return [...res["restaurants"]]
}


export default function AdminRestaurants(){
    useEffect(() => {
        const setData = (restaurants) => {
            setRestaurants(restaurants)
        }
        getRestaurants().then(((restaurants) => setData(restaurants)))
    }, [])

    const [visible, setVisible] = useState(false);

    const [name, setName] = useState("");
    const [img, setImg] = useState();
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("")
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setImg(fileReader.result);
    }

    const [restaurants, setRestaurants] = useState([]);

    function AddRestaurant(){
        const restaurant = {
            name,
            location,
            description,
            img
        }
        fetch("https://web-production-c5b9.up.railway.app/create_restaurant/",{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify(restaurant)
        })
            .then((res) => res.json())
            .then((v) => console.log(v))
            .catch((err) => console.log(err));
        setRestaurants([...restaurants, restaurant]);
        setName("");
        setDescription("");
    }

    return (
            <div className="my-restaurants">
                <Modal visible={visible} setVisible={setVisible}>
                    <div className="restaurant-adder" onClick={(event) => event.stopPropagation()}>
                        <div className="restaurant-adder__left">
                            <input
                                className="restaurant-adder__img"
                                type="file"
                                onChange={(e) => fileReader.readAsDataURL(e.target.files[0])}
                            />
                            <button
                                className="restaurant-adder__add-btn"
                                onClick={() => {
                                    setVisible(false)
                                    AddRestaurant()
                                }}
                            >Добавить ресторан
                            </button>
                        </div>
                        <div className="restaurant-adder__right">
                            <input
                                className="restaurant-adder__name"
                                onChange={(event) => setName(event.target.value)}
                                value={name}
                                placeholder="Название"
                            />
                            <select
                                className="restaurant-adder__location"
                                onChange={(e) => setLocation(e.target.value)}
                                defaultValue=""
                            >
                                <option hidden value="">Адрес</option>
                                <option>Гринвич</option>
                                <option>Мега</option>
                                <option>Парк Хаус</option>
                            </select>
                            <input
                                className="restaurant-adder__description"
                                placeholder="Описание"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal>
                <MenuHeader>
                    <p className="menu-header__name">Мои точки</p>
                    <button onClick={() => setVisible(true)} className="menu-header__add-btn">Добавить точку</button>
                </MenuHeader>
                <ul className="restaurant-list">
                    {restaurants.map((v,i) => <AdminRestaurant
                        name={v.name}
                        location={v.location}
                        id={i}
                        key={i}
                        restaurants={restaurants}
                    />)}
                </ul>
            </div>

    );
}