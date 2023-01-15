import {useNavigate} from "react-router-dom";

export default function ProfileBurger({visible}){
    const classes = ["burger"]
    const redirect = useNavigate()

    if (visible){
        classes.push("visible")
    }
    return(
        <div className={classes.join(' ')}>
            <ul className="burger__list">
                <li className="burger__item">Профиль</li>
                <li className="burger__item" onClick={() => redirect('/user/orders')}>История заказов</li>
                <li className="burger__item">Выйти</li>
            </ul>
        </div>
    )
}