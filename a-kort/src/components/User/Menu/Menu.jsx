import UserHeader from "../UserHeader";
import "../../../styles/User/Menu/Menu.scss"
import Dish from "./Dish";
import {getDishes} from "../../Admin/MenuChanger/MenuChanger";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../UserPanel";
import CategoryButton from "./CategoryButton";
import Cart from "./Cart";
import Modal from "../../Admin/AdminMenu/Modal";

export default function Menu(){
    const {currentRestaurant} = useContext(UserContext)

    useEffect(() => {
        const setData = (categories, dishes) =>{
            setCategories(categories);
            setDishesInCategory([dishes])
        }
        getDishes(currentRestaurant.name, currentRestaurant.location).then((v) => setData(v[0], v[1]))
    }, [])

    const [dishesInCategory, setDishesInCategory] = useState([
        [
            {
                dish_name: "Чизбургер",
                dish_price: 59,
                dish_description: "Очень сырный, стоит дешево"
            },
            {
                dish_name: "Воппер",
                dish_price: 99,
                dish_description: "Побольше чем чизбургер, но, чтобы наестся нужно два"
            }
        ],
        [
            {
                dish_name: "Филадельфия",
                dish_price: 219,
                dish_description: "Самые быстро-съедаемые роллы во всех наборах"
            }
        ],
        [
            {
                dish_name: "Борщ",
                dish_price: 129,
                dish_description: "Наваристый, вкусный, почти как дома"
            }
        ]
    ])
    const [categories, setCategories] = useState(["Бургеры", "Роллы", "Супы"])
    const [currentCategory, setCurrentCategory] = useState(-1)

    const [cartDishes, setCartDishes] = useState([]);
    function addInCart(dish){
        setCartDishes([...cartDishes, dish])
    }

    const [visibleDishDesc, setVisibleDishDesc] = useState(false);
    const [currentDish, setCurrentDish] = useState({})

    return (
        <div>
            <UserHeader>
                <p className="user-header__location">{`${currentRestaurant.name}, ${currentRestaurant.location}`}</p>
            </UserHeader>
            <div className="user-menu">
                <div className="user-menu__main">
                    <ul className="categories">
                        <li className="categories__item">
                            <CategoryButton category={"Всё"}
                                            categoryIndex={-1}
                                            setCurrentCategory={setCurrentCategory}
                                            currentCategoryIdx={currentCategory}
                            />
                        </li>
                        {categories.map((v, index) => <li className="categories__item" key={index}>
                            <CategoryButton category={v}
                                            categoryIndex={index}
                                            setCurrentCategory={setCurrentCategory}
                                            currentCategoryIdx={currentCategory}
                            />
                        </li>)}
                    </ul>
                    <ul className="dishes">
                        {
                            currentCategory === -1 ?
                                dishesInCategory.map((v) => v.map((dish) => <Dish
                                                                                  name={dish.dish_name}
                                                                                  price={dish.dish_price}
                                                                                  photo={dish.dish_image}
                                                                                  description={dish.dish_description}
                                                                                  setCurrentDish={setCurrentDish}
                                                                                  setVisibleDishDesc={setVisibleDishDesc}
                                                                                  addInCart={addInCart}
                                />)):
                                dishesInCategory[currentCategory].map((dish) => <Dish
                                                                                   name={dish.dish_name}
                                                                                   price={dish.dish_price}
                                                                                   photo={dish.dish_image}
                                                                                   description={dish.dish_description}
                                                                                   setCurrentDish={setCurrentDish}
                                                                                   setVisibleDishDesc={setVisibleDishDesc}
                                                                                   addInCart={addInCart}
                                />)
                        }
                    </ul>
                </div>
                <Cart dishes={cartDishes}/>
            </div>
            <Modal visible={visibleDishDesc} setVisible={setVisibleDishDesc}>
                <div className="dish-description" onClick={(e) => {e.stopPropagation()}}>
                    <div className="dish-description__header">
                        <img src={currentDish.photo} alt="" className="dish-description__photo"/>
                        <h2 className="dish-description__name">{currentDish.name}</h2>
                    </div>
                    <p className="dish-description__content">{currentDish.description}</p>
                    <div className="dish-description__footer">
                        <p className="dish-description__price">{currentDish.price} <span>&#8381;</span></p>
                        <button className="dish-description__btn"
                            onClick={() => {
                                setVisibleDishDesc(false);
                                addInCart(currentDish);
                        }}>В корзину</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}