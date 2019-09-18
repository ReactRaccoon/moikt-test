//  Библиотеки
import React from 'react';
import axios from 'axios';

// Common - файлы
import { loadFromLocalStorage } from '../../common/LocalStorage';

// Редьюсер
import { reducer } from './Profile-reducer';

const ProfileStateContext = React.createContext(); // Содержит стейт
const ProfileActionsContext = React.createContext(); // содержит actions

const BASE_API = 'https://mysterious-reef-29460.herokuapp.com/api/v1'

export const ProfileContextProvider = ({ children }) => {

    let storageData = loadFromLocalStorage();

    const initialState = {
        ...storageData,
        profileData: {},
        errors: null
    }
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const getProfileInfo = async (id) => {
        const response = await axios.get(`${BASE_API}/user-info/${id}`)
        if (response.data.status === 'ok') {
            dispatch({
                type: 'SUCCESS_INIT_DATA',
                payload: response.data.data // Данные о пользователе
            })
            return 1

        } else {
            dispatch({
                type: 'ERROR_INIT_DATA',
                payload: response.data.message // здесь сообщение об ошибке
            })
            return 0

        }
    }


    const actions = {
        getProfileInfo
    }

    return (
        <ProfileStateContext.Provider value={state}>
            <ProfileActionsContext.Provider value={actions}>
            {children}
            </ProfileActionsContext.Provider>
        </ProfileStateContext.Provider>
    );
}

export const useProfileState = () => { // Хук для доступа к стейту
    return React.useContext(ProfileStateContext);
}
export const useProfileActions = () => { // и actions
    return React.useContext(ProfileActionsContext);
}