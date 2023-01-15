import {Link} from "react-router-dom";

export default function UserRestaurant({name, photo, rating, location}){

    return (
        <Link to="restaurant" onClick={() => sessionStorage.setItem('currentRestaurant', JSON.stringify({name, location}))}>
            <div className="user-restaurant">
                <img src={photo} alt="" className="user-restaurant__photo"/>
                <h2 className="user-restaurant__name">{name}</h2>
                <p className="user-restaurant__rating">{rating}</p>
            </div>
        </Link>
        )
}