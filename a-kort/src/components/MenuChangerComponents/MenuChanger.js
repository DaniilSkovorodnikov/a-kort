import MenuHeader from './MenuHeader.js'
import '../../styles/MenuChanger.scss'
import Modal from "./Modal";
import {useEffect, useState} from "react";
import Category from "./Category";

async function getData(){
    const initialCategories = [];
    const initialDishes = [];
    const data = await fetch("http://127.0.0.1:8000/get_dishes/");
    const res = await data.json();
    for (const dish of res["dishes"]){
        const image = await fetch(`http://127.0.0.1:8000/get_image/image?${dish.dish_image}`)
        dish.dish_image = await image.json()
        let indexOfCategory = initialCategories.indexOf(dish.dish_category);
        if(indexOfCategory === -1)
            initialCategories.push(dish.dish_category)
        indexOfCategory = initialCategories.indexOf(dish.dish_category);
        if(initialDishes.length - 1 < indexOfCategory)
            initialDishes.push([])
        initialDishes[indexOfCategory].push(dish)
    }
    return [initialCategories, initialDishes]
}

export default function MenuChanger(){
    useEffect(() => {
        const setData = (categories, dishes) =>{
            setCategories(categories);
            setInitialCategoryDishes([...dishes])
        }
        getData().then((v) => setData(v[0], v[1]))
    }, [])

    const [visibleCategoryAdder, setVisibleCategoryAdder] = useState(false);

    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);

    const [initialCategoryDishes, setInitialCategoryDishes] = useState([]);

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
                        setVisibleCategoryAdder(false);
                        setCategoryName('')
                    }} className="category-adder__add-btn">Добавить категорию</button>
                </div>
            </Modal>
            <MenuHeader setVisible={setVisibleCategoryAdder} />
            <div className="menu">
                {categories.map((v, index ) => {
                    return <Category name={v}
                                     id={index}
                                     key={index}
                                     dishes={initialCategoryDishes[index] === undefined ? [] : initialCategoryDishes[index]}
                    />
                })}
            </div>
        </div>
    );
}