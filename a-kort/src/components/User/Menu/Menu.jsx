import UserHeader from "../UserHeader";
import "../../../styles/User/Menu/Menu.scss"
import Dish from "./Dish";
import {getDishes} from "../../Admin/MenuChanger/MenuChanger";
import {useEffect, useState} from "react";
import CategoryButton from "./CategoryButton";
import Cart from "../Cart/Cart";
import Modal from "../../Admin/AdminMenu/Modal";

export default function Menu(){
    const [currentRestaurant] = useState(JSON.parse(sessionStorage.getItem('currentRestaurant')))

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

    const [cartDishesStack, setCartDishesStack] = useState([])
    function addInCart(dish){
        //Перерисует компонент
        setCartDishesStack([...cartDishesStack,dish])
        addDishInCart(dish)
    }

    function addDishInCart(dish) {
        const cart = JSON.parse(sessionStorage.getItem('cart')) ?? {};
        let counter = 0;
        let cartContainsDish = false;
        const currentRest = `${currentRestaurant.name}, ${currentRestaurant.location}`
        if (cart[currentRest]){
            for (const el of cart[currentRest]) {
                if (dish.name === el.dish.name && currentRestaurant.name === el.restaurantName &&
                    currentRestaurant.location === el.restaurantLocation) {
                    cart[currentRest][counter].count++;
                    cartContainsDish = true;
                }
                counter++;
            }
        }
        else {
            cart[currentRest] = [];
        }
        if (!cartContainsDish) {
            cart[currentRest].push({
                dish,
                count: 1,
                restaurantName: currentRestaurant.name,
                restaurantLocation: currentRestaurant.location
            })
        }
        sessionStorage.setItem('cart', JSON.stringify(cart))
    }

    function clearCart(){
        setCartDishesStack([])
        sessionStorage.setItem('cart', JSON.stringify({}))
    }

    function sendOrder(){
        fetch("http://127.0.0.1:8000/create_order/", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: sessionStorage.getItem('cart')
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
                                dishesInCategory.map((v) => v.map((dish, i) => <Dish
                                                                                  name={dish.dish_name}
                                                                                  price={dish.dish_price}
                                                                                  photo={dish.dish_image}
                                                                                  description={dish.dish_description}
                                                                                  setCurrentDish={setCurrentDish}
                                                                                  setVisibleDishDesc={setVisibleDishDesc}
                                                                                  addInCart={addInCart}
                                                                                  key={i}
                                />)):
                                dishesInCategory[currentCategory].map((dish, i) => <Dish
                                                                                   name={dish.dish_name}
                                                                                   price={dish.dish_price}
                                                                                   photo={dish.dish_image}
                                                                                   description={dish.dish_description}
                                                                                   setCurrentDish={setCurrentDish}
                                                                                   setVisibleDishDesc={setVisibleDishDesc}
                                                                                   addInCart={addInCart}
                                                                                   key={i}
                                />)
                        }
                    </ul>
                </div>
                <Cart cartDishes={JSON.parse(sessionStorage.getItem('cart')) ?? {}}
                      sendOrder={sendOrder}
                      clear={clearCart}
                />
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