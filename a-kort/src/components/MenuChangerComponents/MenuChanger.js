import MenuHeader from './MenuHeader.js'
import '../../styles/MenuChanger.scss'
import Modal from "./Modal";
import {useState} from "react";
import Category from "./Category";


let initialDishes = [];
let initialCategories = [];
(async function getDishes(){
    let response = await fetch("http://127.0.0.1:8000/get_dishes/")
    if (response.ok){
        initialDishes = await response.json()
        await initialDishes.forEach((v) => {
            if (initialCategories.indexOf(v.dish_category) === -1) {
                initialCategories.push(v.dish_category)
            }
        })
        await console.log(initialDishes)
    }
    else{
        console.log(response.status)
    }
})();

export default function MenuChanger(){
    const [visibleCategoryAdder, setVisibleCategoryAdder] = useState(false);
    const [visibleDishAdder, setVisibleDishAdder] = useState(false);

    const [categoryName, setCategoryName] = useState("");
    const [currentCategory, setCurrentCategory] = useState(0);
    const [photo, setPhoto] = useState();
    const [photoURL, setPhotoURL] = useState()
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setPhotoURL(fileReader.result)
        console.log(fileReader.result)
    }

    const [price, setPrice] = useState('');
    const [name, setDishName] = useState('');
    const [desc, setDesc] = useState('');
    const [categoryDishes, setCategoryDishes] = useState([]);
    const [categories, setCategories] = useState(initialCategories);

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
                {categories.map((v, index) => <Category name={v}
                                                        id={index}
                                                        key={index}
                                                        setVisible={setVisibleDishAdder}
                                                        setCurrentCategory={setCurrentCategory}
                                                        dishes={categoryDishes[index]}
                />)}

            </div>
        </div>
    );
}