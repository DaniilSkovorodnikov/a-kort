import {useState} from "react";
import {Link, redirect, useNavigate} from "react-router-dom";
import logo from "../img/user-logo.svg";

export default function Registration(){
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false);
    const [classes, setClasses] = useState(["registration__error"]);
    const navigate = useNavigate();

    async function registration(){
        const res = await fetch("http://127.0.0.1:8000/register_user/", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify({login, password})
        })
        const isSuccess = res.json();
        if(isSuccess){
            sessionStorage.setItem('login', login)
            navigate("/user")
        }
        else{
            setClasses([...classes, "visible"])
        }
    }

    return (<div className="registration">
        <div className="registration__header">
            <Link to="/"><img src={logo} alt="" /></Link>
            <Link to="/">Лицензионное соглашение</Link>
        </div>
        <div className="registration__form">
            <h2 className="registration__form-name">Регистрация</h2>
            <input placeholder="Введите e-mail" value={login} onChange={(e) => setLogin(e.target.value)} className="login__input"/>
            <p className={classes.join(' ')}>Данный пользователь уже существует!</p>
            <input type={"password"} placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="login__input"/>
            <button className="registration__submit" onClick={() => {
                registration()
                    .then(() => {
                        setPassword("")
                    })
            }}>Зарегистрироваться</button>
        </div>
    </div>)
}