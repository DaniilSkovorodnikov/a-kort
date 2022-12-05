import logo from "../../img/user-logo.svg"
import {Link} from "react-router-dom";

export default function UserHeader({children}){
    return (<div className="user-header">
        <div className="user-header__left">
            <Link to="/user"><img src={logo} alt="" /></Link>
            <input className="user-header__search" placeholder="Найти блюдо..."/>
            {children}
        </div>
        <div className="user-header__buttons">
            <button className="user-header__theme"></button>
            <button className="user-header__profile"></button>
            <p className="user-header__login">{sessionStorage.getItem('login')}</p>
        </div>
    </div>);
}