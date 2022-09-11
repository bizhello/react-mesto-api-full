import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import {useState, useEffect, } from "react";
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip"
import {getContentAuth, loginAuth, registerAuth, logout} from "../utils/Auth"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [infoTooltipSuccess, setInfoTooltipSuccess] = useState(true);
  const [openInfoTooltip, setOpenInfoTooltip] = useState(false);

  const [data, setData] = useState({
      email: '',
      id: ''
  });

  useEffect(()=> {
      if(loggedIn) {
          navigate('/')
      }
      else {
          navigate('/sign-in')
      }
  },[loggedIn])

  useEffect(()=> {
      tokenCheck();
   }, []);

  useEffect(()=> {
      const apiGetInitialCards = api.getInitialCards();
      const apiGetUserInfo = api.getUserInfo();
      if (loggedIn) {
          Promise.all([apiGetInitialCards, apiGetUserInfo])
              .then(([cards, userInfo]) => {
                  setCards(
                      cards.map((item) => ({
                          ...item,
                          ownerId: item.owner,
                      }))
                  );
                  setCurrentUser(userInfo);
              })
              .catch(err => {
                  console.log(err);
              });
      }
  },[loggedIn]);

  const handelLogin = (email, password ) => {
      loginAuth(email, password)
          .then((res) => {
                  setData({
                      email: email,
                      id: res.id
                  })
                  navigate('../', setLoggedIn(true));
          })
          .catch(err => {
              setInfoTooltipSuccess(false);
              setOpenInfoTooltip(true);
              console.log(err);
          });
  }
  const handelRegister = (login, password) => {
      registerAuth(login, password)
          .then((res) => {
              res.data &&
                  navigate('../sign-in', setInfoTooltipSuccess(true));
                  setOpenInfoTooltip(true);
          })
          .catch(err => {
              setInfoTooltipSuccess(false);
              setOpenInfoTooltip(true);
              console.log(err);
          });
  }
  const handelLogout = () => {
      logout()
          .then(() => {
              setLoggedIn(false)
      })
          .catch(err => {
              console.log(err);
          });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleCardClick = (src) => {
    setSelectedCard(src);
  }
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);

  }
    const tokenCheck = () => {
            getContentAuth()
                .then((res) => {
                    setData({
                        email: res.email,
                        id: res._id
                    });
                    navigate('../', setLoggedIn(true));
                })
                .catch((err) => console.log(err));
    }

  function handleUpdateUser(name, about) {
      api.editUserInfo(name, about)
          .then(()=> {
              setCurrentUser({
                  name: name,
                  about: about,
                  avatar: currentUser.avatar,
                  _id: currentUser._id,
              })
          })
          .catch(err => {
              console.log(err);
          });
  }
  function handleUpdateAvatar(avatar) {
      api.changePhotoProfile(avatar)
          .then(()=>{
              setCurrentUser({
                  name: currentUser.name,
                  about: currentUser.about,
                  avatar: avatar,
                  _id: currentUser._id,
              })
          })
          .catch(err => {
              console.log(err);
          });
    }
  function handleCardLike(card) {
      const isLiked = !!(card.likes !== undefined && card.likes.includes(currentUser._id, 0));
      api.changeLikeCardStatus(card._id, !isLiked)
          .then((newCard) => {
              // setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
              setCards((state) => state.map((c) => c._id === card._id ? { ...newCard, ownerId: newCard.owner } : c));
              })
          .catch(err => {
              console.log(err);
          });
  }
  function handleCardDelete(card) {
      api.deleteCard(card._id)
          .then(() => {
              setCards(cards.filter(item => item !== card))
          })
          .catch(err => {
              console.log(err);
          });
  }
  function createCard(name, link) {
      api.createCard(name, link)
          .then((res) => {
              setCards([{ ...res, ownerId: data.id }, ...cards]);
          })
          .catch(err => {
              console.log(err);
          });
  }

  return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="container">
          <div className="page">
            <Routes>
              <Route
                path="/"
                element={<Main data={data} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                      cards={cards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} handelLogout={handelLogout}/> }/>
              <Route
                path="/sign-up"
                element={<Register handelRegister={handelRegister}/>} />
              <Route
                path="/sign-in"
                element={<Login handelLogin={handelLogin}/>} />
              <Route
                path="*"
                element={loggedIn ? <Navigate to='/'/> : <Navigate to='/sign-in'/>} />
            </Routes>

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <AddPlacePopup addPlace={isAddPlacePopupOpen} onClose={closeAllPopups} createCard={createCard}/>

            <PopupWithForm name={`delete-card`} title={`Вы уверены?`} onClose={closeAllPopups} buttonText='Да' />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <InfoTooltip loggedIn={setLoggedIn} infoTooltipSuccess={infoTooltipSuccess} openInfoTooltip={openInfoTooltip} setOpenInfoTooltip={setOpenInfoTooltip}/>
          </div>
        </div>
        </CurrentUserContext.Provider>

  )
}

export default App;
