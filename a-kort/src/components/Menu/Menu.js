import UserHeader from "./UserHeader";
import "../../styles/Menu/Menu.scss"
import Dish from "./Dish";
import {getData} from "../MenuChangerComponents/MenuChanger";
import {useEffect, useState} from "react";

export default function Menu(){
    useEffect(() => {
        const setData = (categories, dishes) =>{
            setCategories(categories);
            setDishes([dishes])
        }
        getData().then((v) => setData(v[0], v[1]))
    }, [])

    const [dishes, setDishes] = useState([])
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState(-1)

    return (
        <div>
            <UserHeader/>
            <div className="user-menu">
                <ul className="categories">
                    <li className="categories__item">
                        <button className="categories__btn">Всё</button>
                        {categories.map((v, index) => <button className="categories__btn"
                                                              onClick={() => {
                                                                  setCurrentCategory(index)
                                                              }}
                                                              key={index + 1}
                        >{v}</button> )}
                    </li>
                </ul>
                <ul className="dishes">
                    <li>
                        {
                            currentCategory === -1 ?
                            dishes.forEach((v) => {v.map((dish) => <Dish name={dish.dish_name} price={dish.dish_price} photo={dish.dish_image}/>)}):
                            dishes[currentCategory].map((v) => <Dish name={v.dish_name} price={v.dish_price} photo={v.dish_image}/>)
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}