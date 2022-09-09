import React, {useState} from 'react';
import Header from "./Header";
import {NavLink} from "react-router-dom";

function Register(props) {
    const [data, setData] = useState({
        login: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((oldData) => ({
            ...oldData,
            [name]:value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handelRegister(data.login, data.password);
    }

    return(
        <>
            <Header text="Войти" href="/sign-in" mail="" logout={false}/>
            <form className="login" id="register" onSubmit={handleSubmit}>
                <h3 className="login__title">Регистрация</h3>
                <label className="login__input-container" onChange={handleChange}>
                    <input
                        className="login__name login__email"
                        id="login__email"
                        name="login"
                        type="email"
                        placeholder="Email"
                        required
                    />
                </label>
                <label className="login__input-container" onChange={handleChange}>
                    <input
                        className="login__name login__password"
                        id="login__password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        required
                    />
                </label>
                <button className="login__button" type="submit">Зарегистрироваться</button>
                <NavLink to="/sign-in" className="login__text">Уже зарегистрированы? Войти</NavLink>
            </form>
        </>
    )
}

export default Register;