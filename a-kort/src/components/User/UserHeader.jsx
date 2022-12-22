import logo from "../../img/user-logo.svg"
import {Link} from "react-router-dom";
import ProfileBurger from "./ProfileBurger";
import {useState} from "react";

export default function UserHeader({children}){
    const [visible, setVisible] = useState(false)
    const classes = ["user-header__login"]
    const [active, setActive] = useState(false)

    if (active){
        classes.push("active")
    }
    return (<div className="user-header">
        <div className="user-header__left">
            <Link to="/user"><img src={logo} alt="" /></Link>
            <input className="user-header__search" placeholder="Найти блюдо..."/>
            {children}
        </div>
        <div className="user-header__buttons">
            <div className={classes.join(' ')} onClick={() => {
                setVisible(true)
                setActive(true)
            }}>
                {sessionStorage.getItem('login')}
                <ProfileBurger visible={visible}/>
            </div>
        </div>
    </div>);
}