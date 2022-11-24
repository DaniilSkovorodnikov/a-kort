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
            setDishesInCategory(dishes);
        }
        getDishes(currentRestaurant.name, currentRestaurant.location).then((v) => setData(v[0], v[1]))
    }, [])

    const [dishesInCategory, setDishesInCategory] = useState([])
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState(-1)

    const [cartDishes, setCartDishes] = useState([]);
    const [allCartDishes, setAllCartDishes] = useState(JSON.parse(sessionStorage.getItem('cart')) ?? [])
    function addInCart(dish){
        setCartDishes([...cartDishes, dish]);
    }

    function clearCart(){
        sessionStorage.setItem('cart', JSON.stringify([]))
        setAllCartDishes([])
    }

    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem('cart')) ?? [];
        const dish = cartDishes[cartDishes.length - 1];
        if(dish){
            let counter = 0;
            let cartContainsDish = false;
            for (const el of cart) {
                if (dish.name === el.dish.name && currentRestaurant.name === el.restaurantName) {
                    cart[counter].count++;
                    cartContainsDish = true;
                }
                counter++;
            }
            if (!cartContainsDish) {
                cart.push({
                    dish,
                    count: 1,
                    restaurantName: currentRestaurant.name,
                    restaurantLocation: currentRestaurant.location
                })
            }
            sessionStorage.setItem('cart', JSON.stringify(cart))
            setAllCartDishes(cart);
        }
    }, [cartDishes])

    function sendOrder(){
        fetch("http://127.0.0.1:8000/create_order/", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                allCartDishes
            })
        })
            .catch((err) => console.log(err))
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
                <Cart cartDishes={allCartDishes} sendOrder={sendOrder} clear={clearCart}/>
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