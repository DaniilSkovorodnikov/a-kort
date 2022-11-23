import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../UserPanel";

export default function UserRestaurant({name, photo, rating, location}){
    const {setCurrentRestaurant} = useContext(UserContext)

    return (
        <Link to="restaurant" onClick={() => setCurrentRestaurant({name, location})}>
            <div className="user-restaurant">
                <img src={photo} alt="" className="user-restaurant__photo"/>
                <h2 className="user-restaurant__name">{name}</h2>
                <p className="user-restaurant__rating">{rating}</p>
            </div>
        </Link>
        )
}