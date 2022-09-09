class Api {
    constructor({url, credentials, headers}) {
        this._url = url;
        this._credentials = credentials;
        this._headers = headers;
    }

    _getResponseData(res)  {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            credentials: this._credentials,
            headers: this._headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            credentials: this._credentials,
            headers: this._headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    editUserInfo(name, about) {
        return  fetch(`${this._url}users/me`, {
            method: 'PATCH',
            credentials: this._credentials,
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    createCard(name, link) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            credentials: this._credentials,
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`,
                // likes: []
            }),
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            credentials: this._credentials,
            headers: this._headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            credentials: this._credentials,
            headers: this._headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    changePhotoProfile(avatar) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            credentials: this._credentials,
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
}

export const api = new Api({
    url: 'https://api.bizhello.nomoredomains.sbs/',
    credentials: 'include',
    headers: {
        "content-type": "application/json",
    },
})
