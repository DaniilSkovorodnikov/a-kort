import logo from "../../img/logo.svg"

export default function Header(){
    return (
    <div className="site-nav">
        <img src={logo} alt={""}/>
        <nav>
            <ul className="site-nav__list">
                <li className="site-nav-item"><a href="a-kort/src/components/MenuChangerComponents/Header#">Личный кабинет</a></li>
                <li className="site-nav__item"><a href="a-kort/src/components/MenuChangerComponents/Header#">Мои точки</a></li>
            </ul>
        </nav>
    </div>
    );
}