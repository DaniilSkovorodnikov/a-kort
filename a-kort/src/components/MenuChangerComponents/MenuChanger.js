import MenuHeader from './MenuHeader.js'
import '../../styles/MenuChanger.scss'
import Modal from "./Modal";
import {useEffect, useState} from "react";
import Category from "./Category";

async function getData(){
    const data = await new Promise((resolve, reject) => {
        const initialCategories = [];
        const initialDishes = [];
        initialCategories.push("Бургеры", "Роллы");
        initialDishes.push(
            [{dish_name: "Чизбургер", dish_price: "55", dish_image: ""}],
            [{dish_name: "Филадельфия", dish_price: "150", dish_image: ""}]
        );
        resolve([initialCategories, initialDishes])
    }).then((v) => v)
    return data
}

export default function MenuChanger(){
    useEffect(() => {
        const setData = (categories, dishes) =>{
            setCategories(categories);
            setCategoryDishes([...dishes])
        }
        getData().then((v) => setData(v[0], v[1]))
    }, [])


    const [visibleCategoryAdder, setVisibleCategoryAdder] = useState(false);
    const [visibleDishAdder, setVisibleDishAdder] = useState(false);

    const [categoryName, setCategoryName] = useState("");
    const [currentCategory, setCurrentCategory] = useState(-1);
    const [photo, setPhoto] = useState();
    const [photoURL, setPhotoURL] = useState()
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setPhotoURL(fileReader.result)
    }
    const [price, setPrice] = useState('');
    const [name, setDishName] = useState('');
    const [desc, setDesc] = useState('');
    const [categoryDishes, setCategoryDishes] = useState([]);
    const [categories, setCategories] = useState([]);

    function AddNewDish(name, price, description, photo){
        const dish = {
            dish_name: name,
            dish_price: price,
            dish_description: description,
            dish_image: photo,
            dish_category: categories[currentCategory]
        }
        fetch("http://127.0.0.1:8000/add_dish/", {
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
        categoryDishes[currentCategory].push((dish));
    }


    return (
        <div className="menu-changer">
            <Modal visible={visibleCategoryAdder} setVisible={setVisibleCategoryAdder}>
                <div className="category-adder__content" onClick={(e) => e.stopPropagation()}>
                    <input className="category-adder__name"
                           value={categoryName}
                           onChange={(e) => setCategoryName(e.target.value)}
                           placeholder="Введите название категории"
                    />
                    <button onClick={() => {
                        setCategories([...categories, categoryName])
                        setCategoryDishes([...categoryDishes, []])
                        setVisibleCategoryAdder(false);
                    }} className="category-adder__add-btn">Добавить категорию</button>
                </div>
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
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <button
                                    className="dish-characteristics__add-btn"
                                    onClick={() => {
                                        setVisibleDishAdder(false);
                                        AddNewDish(name, price, desc, photoURL);
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
                                onChange={(e) => setDishName(e.target.value)}
                            />
                            <input
                                className="dish-characteristics__desc"
                                placeholder="Описание"
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            <MenuHeader setVisible={setVisibleCategoryAdder} />
            <div className="menu">
                {categories.map((v, index ) => {
                    console.log(categories, categoryDishes, currentCategory);
                    return <Category name={v}
                              id={index}
                              key={index}
                              setVisible={setVisibleDishAdder}
                              setCurrentCategory={setCurrentCategory}
                              dishes={categoryDishes[index]}
                    />
                })}
            </div>
        </div>
    );
}