

export default function Dish({name, price, photo}){
    return (
        <li className="user-dish">
            <img src={photo} className="user-dish__photo" alt=""></img>
            <h2 className="user-dish__name">{name}</h2>
            <p className="user-dish__price">{price}</p>
        </li>
    )
}