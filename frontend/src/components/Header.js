import React from 'react';
import {NavLink} from "react-router-dom";

function Header(props) {

    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__nav">
                <p className="header__mail">{props.email}</p>
                <NavLink className="header__text" to={props.href} onClick={props.logout}>{props.text}</NavLink>
            </div>

        </header>

    );
}

export default Header;
