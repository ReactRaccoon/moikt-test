import React, { createContext } from 'react';

//Библиотеки
import axios from 'axios';

//Редьюсер
import { reducer } from './Auth-reducer';

// Операции с localStorage
import { saveToLocalStorage, loadFromLocalStorage, deleteFromLocalStorage } from '../../common/LocalStorage';

const AuthStateContext = createContext(); // Провайдит state
const AuthActionsContext = createContext(); // actions

const BASE_API = 'https://mysterious-reef-29460.herokuapp.com/api/v1';

export const AuthContextProvider = ({ children }) => {

    const initialState = {
        isLogged: loadFromLocalStorage() ? loadFromLocalStorage().isLogged : false,
        error: null,
        isFetching: false,
        id: loadFromLocalStorage() ? loadFromLocalStorage().id : null
    }

    const [state, dispatch] = React.useReducer(reducer, initialState)

    // 

    const successLogged = (id) => {
        dispatch({ type: 'SUCCESS_IS_LOGGED', payload: id })
    }

    const failedLogged = (message) => {
        dispatch({
            type: 'ERROR_IS_LOGGED',
            payload: message
        })
    }

    //


    const login = async (email, password) => {
        const body = { email, password };
        const response = await axios.post(`${BASE_API}/validate`, body)
        if (response.data.status === 'ok') {

            let aboutMe = {
                ...response.data.data,
                isLogged: true,
            }
            successLogged(response.data.data.id)
            saveToLocalStorage(aboutMe);
            return response.data;
        }
        else {
            failedLogged(response.data.message)
            return response.data;

        }
        
        
    }

    const logout = () => {        
         // deleting data about logged user
        dispatch({ type: 'LOGOUT'})
        deleteFromLocalStorage();
    }


    const actions = {
        login, logout
    }
    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionsContext.Provider value={actions}>
                {children}
            </AuthActionsContext.Provider>
        </AuthStateContext.Provider>
    );
}



export const useAuthState = () => { // хук для использования стейта
    return React.useContext(AuthStateContext);
}
export const useAuthActions = () => { // и actions
    return React.useContext(AuthActionsContext);
}