import React from 'react';

function InfoTooltip(props) {
    const logo = (
        `popup-login__logo ${props.infoTooltipSuccess && 'popup-login__logo_register'}`
    );
    const text = (
        `${props.infoTooltipSuccess ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.` }`
    );
    const opened = (
        `popup popup-login ${props.openInfoTooltip && 'popup_opened'}`
    );
    const close = () => {
        props.setOpenInfoTooltip(false);
    };

    return (
        <div className={opened}>
            <div className="popup__page">
                <div className="popup__container popup-login__container" >
                    <div className={logo}></div>
                    <p className="popup-login__text">{text}</p>
                    <button className="popup__close popup-login__close" onClick={close}></button>
                </div>
            </div>
        </div>
    )
}
export default InfoTooltip
