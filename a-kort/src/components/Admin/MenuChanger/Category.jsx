import AdminDish from "./AdminDish";
import Modal from "../AdminMenu/Modal";
import {useState} from "react";

export default function Category({name, id, dishes, restaurantName, restaurantLocation}){
    const index = id
    const categoryName = name

    const [visibleChanger, setVisibleChanger] = useState(false);
    const [visibleDishAdder, setVisibleDishAdder] = useState(false);

    const [dishPrice, setPrice] = useState('');
    const [dishName, setDishName] = useState('');
    const [dishDesc, setDesc] = useState('');
    const [dishPhoto, setPhoto] = useState();
    const [photoURL, setPhotoURL] = useState()

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setPhotoURL(fileReader.result)
    }

    const [categoryDishes, setCategoryDishes] = useState(dishes)

    function AddNewDish(dish_name, dish_price, dish_description, dish_image){
        const dish = {
            dish_name,
            dish_price,
            dish_description,
            dish_image,
            dish_category: categoryName,
            restaurant_name: restaurantName,
            restaurant_location: restaurantLocation
        }
        fetch("http://26.87.4.182:8000/add_dish/", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify({dish})
        })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        setCategoryDishes([...categoryDishes, dish])
    }

    return(
        <div>
            <Modal visible={visibleChanger} setVisible={setVisibleChanger}>
                <ul className="current-dishes">
                    {categoryDishes.map((v, i) => <li className="current-dishes__item" key={i}>
                        <p>{i + 1}. {v.dish_name}</p>
                        <button onClick={() => {
                            fetch(`http://26.87.4.182:8000/delete_dish/?name=${v.dish_name}`)
                                .then((res) => res.json())
                                .then((e) => console.log(e))
                                .catch((err) => console.log(err))
                            setCategoryDishes((prevState) => prevState.filter((dish) => {
                                return dish.dish_name !== v.dish_name
                            }))
                        }}>Удалить</button>
                    </li>)}
                </ul>
            </Modal>
            <Modal visible={visibleDishAdder} setVisible={setVisibleDishAdder}>
                <div className="dish-adder">
                    <div className="dish-characteristics" onClick={(e) => e.stopPropagation()}>
                        <div className="dish-characteristics__left">
                            <input
                                className="dish-characteristics__photo"
                                type="file"
                                onChange={(e) => {
                                    setPhoto(e.target.files[0]);
                                    fileReader.readAsDataURL(e.target.files[0])
                                }}
                            />
                            <div className="dish-characteristics__numerical">
                                <input
                                    className="dish-characteristics__price"
                                    placeholder="Цена"
                                    value={dishPrice}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <button
                                    className="dish-characteristics__add-btn"
                                    onClick={() => {
                                        setVisibleDishAdder(false);
                                        AddNewDish(dishName, dishPrice, dishDesc, photoURL)
                                        setPrice('')
                                        setDishName('')
                                        setDesc('')
                                    }
                                    }
                                >
                                    Добавить блюдо
                                </button>
                            </div>
                        </div>
                        <div className="dish-characteristics__right">
                            <input
                                className="dish-characteristics__name"
                                placeholder="Название"
                                value={dishName}
                                onChange={(e) => setDishName(e.target.value)}
                            />
                            <input
                                className="dish-characteristics__desc"
                                placeholder="Описание"
                                value={dishDesc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="category">
                <div className="category__header">
                    <h2 className="category__name">{name}</h2>
                    <div className="category__buttons">
                        <button onClick={() => {
                            console.log(categoryDishes);
                            setVisibleChanger(true)
                        }}>Изменить категорию</button>
                        <button onClick={() => setVisibleDishAdder(true)} className="category__add-btn">Добавить блюдо</button>
                    </div>
                </div>
                <ul className="category__dishes">
                    {categoryDishes.map((v, i) => {
                        return <AdminDish name={v.dish_name} price={v.dish_price} photo={v.dish_image} key={i}
                                          categoryDishes={categoryDishes}
                                          updateCategoryDishes={setCategoryDishes}/>;
                    })}
                </ul>
            </div>
        </div>
    );
}