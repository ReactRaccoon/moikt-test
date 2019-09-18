import React from 'react';
import './App.css';

// Библиотеки
import { Switch, Route } from 'react-router-dom';

// Страницы
import Profile from './pages/Profile/Profile/Profile';
import Login from './pages/Login/Login';
import News from './pages/News/News/News';
import Home from './pages/Home/Home';

// компоненты
import Navbar from './components/Navbar/Navbar';

// Common -файлы
import Error from './common/Error';
import PrivateRouter from './common/PrivateRouter';

// хуки
import { useEffect } from 'react'
import {useAuthState, useAuthActions } from './context/Auth/Auth-context';



function App({ me, ...props }) {

  useEffect(() => { // auth
    if (me) {
      login(me.email, me.password)  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me])

  const {login} = useAuthActions();

  const { isLogged } = useAuthState();

  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <Switch>
          <PrivateRouter 
                        path={['/profile', '/profile/:id']} // Защищённые роуты
                        Component={Profile}
                        redirect='/login'
                        allowed={isLogged} 
          />
          <PrivateRouter 
                        path={'/login'} 
                        Component={Login} 
                        redirect='/profile' 
                        allowed={!isLogged}
          />
          <Route exact path='/' component={Home} />
          <Route path={'/news'} component={News} />
          <Route component={Error} />  {/* Если не найдена страница */}
        </Switch>

      </div>

    </>
  );
}

export default App;
