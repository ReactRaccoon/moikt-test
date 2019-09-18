    // библиотеки
import React from 'react'
import axios from 'axios';

// Редьюсер
import { reducer } from './News-reducer';


const BASE_API = 'https://mysterious-reef-29460.herokuapp.com/api/v1'

const NewsStateContext = React.createContext(); // контекст со стейтом
const NewsActionsContext = React.createContext(); // контекст с actions

export const NewsContextProvider = ({ children }) => {

    const initialState = {
        news: [],
        error: null,
    }

    const [state, dispatch] = React.useReducer(reducer, initialState)

    const getNews = async () => {
        const response = await axios.get(`${BASE_API}/news`)
        if (response.data.status === 'ok') {
            dispatch({
                type: 'SUCCESS_GET_NEWS',
                payload: response.data.data
            })
        } else {
            dispatch({
                type: 'ERROR_GET_NEWS',
                payload: response.data.message
            })
        }

    }

    const actions = React.useMemo(() => ({ // позволяет закешировать нам функцию 
        getNews,                    // и оптимизировать приложение, избавившись от ненужных перерисовок
    }), [])

    return (
        <NewsStateContext.Provider value={state}>
            <NewsActionsContext.Provider value={actions}>
                {children}
            </NewsActionsContext.Provider>
        </NewsStateContext.Provider>
    );
}

export const useNewsState = () => { // кастомные хуки для доступа к state
    return React.useContext(NewsStateContext);
}
export const useNewsActions = () => { // и к actions
    return React.useContext(NewsActionsContext);
}