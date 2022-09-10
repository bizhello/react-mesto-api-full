import React, {useState, useEffect} from 'react';
import Header from "./Header";
import {NavLink} from "react-router-dom";

function Register(props) {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    const [data, setData] = useState({
        login: '',
        password: ''
    })
    const handlerBlur = (e) => {
        switch (e.target.name) {
            case 'login__email' :
                setEmailDirty(true);
                break;
            case 'login__password' :
                setPasswordDirty(true);
                break;
        }
    }
    const handlerEmail = (e) => {
        setInputEmail(e.target.value);
        const re = /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase()))
        {
            setEmailError("Некорректный email");
        }
        else if(e.target.value.length === 0) {
            setEmailError("Email не может быть пустым");
        }
        else {
            setEmailError("");
        }
    }
    const handlerPassword = (e) => {
        setInputPassword(e.target.value);
        if (e.target.value.length < 6) {
            setPasswordError("Пароль должен быть не менее 6 символов");
            if(!e.target.value) {
                setPasswordError("Пароль не может быть пустым");
            }
        }
        else {
            setPasswordError("")
        }
    }
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

    useEffect(()=> {
        if(emailError || passwordError) {
            setFormValid(false)
        }
        else {
            setFormValid(true);
        }

    },[emailError, passwordError])

    return(
        <>
            <Header text="Войти" href="/sign-in" mail="" logout={false}/>
            <form className="login" id="register" onSubmit={handleSubmit}>
                <h3 className="login__title">Регистрация</h3>
                <label className="login__input-container" onChange={handleChange}>
                    {(emailDirty && emailError) && <span className="error">{emailError}</span>}
                    <input
                        onChange={e=> handlerEmail(e)}
                        onBlur={e=> handlerBlur(e)}
                        value={inputEmail}
                        className="login__name login__email"
                        id="login__email"
                        name="login"
                        type="email"
                        placeholder="Email"
                        required
                    />
                </label>
                <label className="login__input-container" onChange={handleChange}>
                    {(passwordDirty && passwordError) && <span className="error">{passwordError}</span> }
                    <input
                        onChange={e=> handlerPassword(e)}
                        onBlur={e=> handlerBlur(e)}
                        value={inputPassword}
                        className="login__name login__password"
                        id="login__password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        required
                    />
                </label>
                <button disabled={!formValid} className="login__button" type="submit">Зарегистрироваться</button>
                <NavLink to="/sign-in" className="login__text">Уже зарегистрированы? Войти</NavLink>
            </form>
        </>
    )
}

export default Register;