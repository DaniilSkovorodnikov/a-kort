import '../../../styles/MenuChanger.scss'
import Modal from "../AdminMenu/Modal";
import React, {useEffect, useState} from "react";
import Category from "./Category";
import MenuHeader from "../AdminMenu/MenuHeader";

export async function getDishes(name, location){
    const initialCategories = [];
    const initialDishes = [];
    const data = await fetch(`http://127.0.0.1:8000/get_restaurant_dishes/?name=${name}&address=${location}`)
    const res = await data.json();
    for (const dish of res["dishes"]){
        if(dish.dish_image !== ''){
            dish.dish_image = `http://127.0.0.1:8000/get_image/?image=${dish.dish_image}`
        }
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

export default function MenuChanger({currentRestaurant}){
    useEffect(() => {
        const setData = (categories, dishes) =>{
            setCategories(categories);
            setInitialCategoryDishes([...dishes])
        }
        getDishes(currentRestaurant.name, currentRestaurant.location).then((v) => setData(v[0], v[1]))
    }, [])

    const [visibleCategoryAdder, setVisibleCategoryAdder] = useState(false);

    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);

    const [initialCategoryDishes, setInitialCategoryDishes] = useState([]);

    return (
            <div className="menu-changer">
                <Modal visible={visibleCategoryAdder} setVisible={setVisibleCategoryAdder}>
                    <div className="category-adder" onClick={(e) => e.stopPropagation()}>
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
                <MenuHeader>
                    <div className="menu-header__about">
                        <p className="menu-header__name">{currentRestaurant.name}</p>
                        <p className="menu-header__location">{currentRestaurant.location}</p>
                    </div>
                    <button onClick={() => setVisibleCategoryAdder(true)} className="menu-header__add-btn">Добавить категорию</button>
                </MenuHeader>
                <div className="admin-menu">
                    {categories.map((v, index ) => {
                        return <Category name={v}
                                         id={index}
                                         key={index}
                                         dishes={initialCategoryDishes[index] === undefined ? [] : initialCategoryDishes[index]}
                                         restaurantName={currentRestaurant.name}
                                         restaurantLocation={currentRestaurant.location}
                        />
                    })}
                </div>
            </div>
    );
}