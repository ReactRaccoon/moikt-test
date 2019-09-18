    // Библиотеки
import React from 'react'
import { Route, Redirect } from 'react-router-dom';




const PrivateRouter = ({ Component, redirect, allowed, ...other }) => {
    
    return ( 
        <Route {...other} allowed = {allowed}  // свойства и доступность
            render={(other) => allowed  // Если доступ к рендеру есть
                ? <Component {...other}/> // то рисовать компонент с пропсами
                : <Redirect to={redirect} /> // Иначе редирект
            }
        />
    )

}

export default PrivateRouter;