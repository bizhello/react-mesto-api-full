import React from 'react';

function PopupRegister() {

    return (
        <div className="popup popup-login popup_opened">
            <div className="popup__page">
                <div className="popup__container popup-login__container" >
                    <div className="popup-login__logo popup-login__logo_register"></div>
                    <p className="popup-login__text">Вы успешно <br></br>зарегистрировались!</p>
                    <button className="popup__close popup-login__close"></button>
                </div>
            </div>
        </div>
    )
}

export default PopupRegister;