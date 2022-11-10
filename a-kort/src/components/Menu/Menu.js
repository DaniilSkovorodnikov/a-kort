import UserHeader from "./UserHeader";
import "../../styles/Menu/Menu.scss"
import Dish from "./Dish";
import {getData} from "../MenuChangerComponents/MenuChanger";
import {useEffect, useState} from "react";

export default function Menu(){
    useEffect(() => {
        const setData = (categories, dishes) =>{
            setCategories(categories);
            setDishes(dishes)
        }
        getData().then((v) => setData(v[0], v[1]))
    }, [])

    const [dishes, setDishes] = useState([])
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState(0)

    return (
        <div>
            <UserHeader/>
            <div className="user-menu">
                <ul className="categories">
                    {categories.map((v, index) => <li className="categories__item" key={index}>
                        <button className="categories__btn"
                                                          onClick={() => {
                                                              setCurrentCategory(index)
                                                          }}
                                                          key={index}
                    >{v}</button>
                    </li>)}
                </ul>
                <ul className="dishes">
                        {
                            dishes[currentCategory].map((v) => <Dish name={v.dish_name} price={v.dish_price} photo={v.dish_image}/>)
                        }
                </ul>
            </div>
        </div>
    )
}