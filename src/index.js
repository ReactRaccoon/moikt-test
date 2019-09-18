import React from 'react';
import './index.scss';
import * as serviceWorker from './serviceWorker';

// библиотеки
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//Компоненты
import App from './App';

// Common - файлы
import { loadFromLocalStorage } from './common/LocalStorage';

// Передаём данные из контекстов
import { AuthContextProvider } from './context/Auth/Auth-context';
import { ProfileContextProvider } from './context/Profile/Profile-context';
import { NewsContextProvider } from './context/News/News-context';

//


const me = loadFromLocalStorage();

ReactDOM.render(
    <BrowserRouter>
        <AuthContextProvider >
            <ProfileContextProvider>
                <NewsContextProvider >
                    <App me={me} />
                </NewsContextProvider>
            </ProfileContextProvider>
        </AuthContextProvider>
    </BrowserRouter>, document.getElementById('root'));
                    
                    // If you want your app to work offline and load faster, you can change
                    // unregister() to register() below. Note this comes with some pitfalls.
                    // Learn more about service workers: https://bit.ly/CRA-PWA
                    serviceWorker.register();
