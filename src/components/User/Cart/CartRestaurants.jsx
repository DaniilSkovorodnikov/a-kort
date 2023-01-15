import CartDish from "./CartDish";

export default function CartRestaurants({restaurant, dishes}){
    return(
        <li className="cart__item">
            <h3 className="cart__restaurant">{restaurant}</h3>
            <ul className="cart__dishes">
                {dishes.map((v,i) => <CartDish dishDesc={v} id={i} key={i}/>)}
            </ul>
        </li>
    )
}