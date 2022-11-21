import logo from "../../img/logo.svg"

export default function UserHeader({children}){
    return (<div className="user-header">
        <div className="user-header__left">
            <img src={logo} alt="" />
            <input className="user-header__search" placeholder="Найти блюдо..."/>
            {children}
        </div>
        <div className="user-header__buttons">
            <button className="user-header__theme"></button>
            <button className="user-header__profile"></button>
        </div>
    </div>);
}