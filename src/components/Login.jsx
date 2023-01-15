import logo from "../img/user-logo.svg"
import smartphone from "../img/big-smartphone.png"
import "../styles/Login.scss"
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";


export default function Login(){
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [classes, setClasses] = useState(["login__error"]);

    async function doLogin(){
        const res = await fetch("https://web-production-c5b9.up.railway.app/auth_user/", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify({login, password})
        });
        const isSuccess = await res.json();
        if(isSuccess){
            sessionStorage.setItem('login', login)
            navigate("/user")
        }
        else{
            setClasses([...classes, "visible"])
        }
    }

    return (<div className="login">
        <div className="login__header">
            <Link to="/"><img src={logo} alt="" /></Link>
            <Link to="/">Лицензионное соглашение</Link>
        </div>
        <div className="login__form">
            <h2 className="login__form-name">Вход</h2>
            <input placeholder="Введите e-mail" value={login} onChange={(e) => setLogin(e.target.value)} className="login__input"/>
            <input type={"password"} placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="login__input"/>
            <p className={classes.join(' ')}>Неверный логин или пароль. Проверьте введённые данные!</p>
            <button className="login__submit" onClick={() => {
                doLogin()
                    .then(() => {
                        setPassword("");
                    });
            }}>Войти</button>
            <Link to="/registration" className="login__registration">Ещё нет аккаунта? Зарегистрируйтесь.</Link>
        </div>
        <button className="login__submit-other" onClick={() => {
            sessionStorage.setItem('login', "unregistred")
            navigate("/user")
        }}>
            Войти без регистрации
        </button>
        <button className="login__submit-other" onClick={() => {
            navigate("/admin")
        }}>
            Войти как админ
        </button>
        <section className="login__hero">
            <img src={smartphone} alt="" className="login__smartphone"/>
            <div className="login__hero-right">
                <h1 className="login__title">Новые заказы без очередей</h1>
                <div className="login__dialog">
                    <p>− Да... Заказы без очередей...</p>
                    <p>− И вообще это клево!</p>
                    <p>− И удобно</p>
                    <p>− И красиво</p>
                </div>
            </div>
        </section>
    </div>)
}