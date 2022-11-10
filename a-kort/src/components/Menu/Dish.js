

export default function Dish({name, price, photo}){
    return (
        <li className="user-dish">
            <img className="user-dish__photo" alt="">{photo}</img>
            <h2 className="user-dish__name">{name}</h2>
            <p className="user-dish__price">{price}</p>
        </li>
    )
}