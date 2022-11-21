import logo from "../../img/logo.svg"
import {Link} from "react-router-dom";

export default function AdminHeader({children}){
    return (
    <div className="site-nav">
        <Link to="/admin"><img src={logo} alt=""/></Link>
        <nav>
            <ul className="site-nav__list">
                {children}
            </ul>
        </nav>
    </div>
    );
}