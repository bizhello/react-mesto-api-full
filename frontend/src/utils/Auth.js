const BASE_URL = 'https://api.bizhello.nomoredomains.sbs';

const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)
}

export const registerAuth = (login, password) => {

    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password" : `${password}`,
            "email" : `${login}`,
        })
    })
        .then(checkResponse)
};

export const loginAuth = (login, password) => {

    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
            "email" : `${login}`,
            "password" : `${password}`,
        })
    })
        .then(checkResponse)
};

export const getContentAuth = () => {

    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
        .then(checkResponse)
        .catch((err) => console.log(err));
}

export const logout = () => {

    return fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
        .then(checkResponse)
        .catch((err) => console.log(err));
}
