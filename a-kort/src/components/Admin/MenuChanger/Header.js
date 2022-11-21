import logo from "../../../img/logo.svg"
import {Link} from "react-router-dom";

export default function Header({children}){
    return (
    <div className="site-nav">
        <Link to="/"><img src={logo} alt={""}/></Link>
        <nav>
            <ul className="site-nav__list">
                {children}
            </ul>
        </nav>
    </div>
    );
}