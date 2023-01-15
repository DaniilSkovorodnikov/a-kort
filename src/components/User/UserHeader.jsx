import logo from "../../img/user-logo.svg"
import {Link, redirect, useNavigate} from "react-router-dom";
import ProfileBurger from "./ProfileBurger";
import {useState} from "react";

export default function UserHeader({toFilter, setFiltered, isFilterDishes ,children}){
    const [visible, setVisible] = useState(false)
    const classes = ["user-header__login"]
    const [active, setActive] = useState(false)
    const navigate = useNavigate()

    if (active){
        classes.push("active")
    }
    return (<div className="user-header">
        <div className="user-header__left">
            <Link to="/user" className="user-header__logo"><img src={logo} alt="" /></Link>
            <input
                className="user-header__search"
                placeholder="Найти блюдо или ресторан..."
                onChange={(event) => {
                    if (isFilterDishes){
                        const filtered = toFilter.map((dishes) => dishes.filter((v) => v.dish_name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))
                        setFiltered(filtered)
                    }
                    else{
                        const filtered = toFilter.filter((v) => v.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
                        setFiltered(filtered)
                    }
                }}
            />
            {children}
        </div>
        <div className="user-header__buttons">
            <div className={classes.join(' ')} onClick={() => {
                setVisible(!visible)
                setActive(!active)
            }}>
                {sessionStorage.getItem('login') !== 'unregistred' ? <span>{sessionStorage.getItem('login')}</span> : <a onClick={() => {
                    sessionStorage.clear()
                    navigate("/")
                }}>Выйти</a>}
                <ProfileBurger visible={visible}/>
            </div>
        </div>
    </div>);
}