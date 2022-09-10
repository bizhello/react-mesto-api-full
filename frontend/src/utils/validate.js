import React, {useEffect, useState} from 'react';

class validate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputEmail: '',
            inputPassword: '',
            emailDirty: false,
            passwordDirty: false,
            emailError: 'Email не может быть пустым',
            passwordError: 'Пароль не может быть пустым',
            formValid: false
        }
    }
    handlerBlur = (e) => {
        switch (e.target.name) {
            case 'login__email' :
                this.setState.emailDirty(true);
                break;
            case 'login__password' :
                this.setState.passwordDirty(true);
                break;
        }
    }
    handlerEmail = (e) => {
        this.setState.inputEmail(e.target.value);
        const re = /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase()))
        {
            this.setState.emailError("Некорректный email");
        }
        else if(e.target.value.length === 0) {
            this.setState.emailError("Email не может быть пустым");
        }
        else {
            this.setState.emailError("");
        }
    }
    handlerPassword = (e) => {
        this.setState.inputPassword(e.target.value);
        if (e.target.value.length < 6) {
            this.setState.passwordError("Пароль должен быть не менее 6 символов");
            if(!e.target.value) {
                this.setState.passwordError("Пароль не может быть пустым");
            }
        }
        else {
            this.setState.passwordError("")
        }
    }
    componentDidMount() {
        if(this.emailError || this.passwordError) {
            this.setState.formValid(false)
        }
        else {
            this.setState.formValid(true)
        }
    }
    componentDidUpdate() {
        if(this.emailError || this.passwordError) {
            this.setState.formValid(false)
        }
        else {
            this.setState.formValid(true)
        }
    }
}
