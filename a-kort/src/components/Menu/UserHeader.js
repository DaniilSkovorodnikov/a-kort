import logo from "../../img/logo.svg"

export default function UserHeader(){
    return (<div className="user-header">
        <div className="user-header__left">
            <img src={logo} alt="" />
            <input className="user-header__search" placeholder="Найти блюдо..."/>
            <p className="user-header__location">Гринвич, 1 очередь</p>
        </div>
        <div className="user-header__buttons">
            <button className="user-header__theme"></button>
            <button className="user-header__profile"></button>
        </div>
    </div>);
}