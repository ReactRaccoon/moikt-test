import React from 'react';

// библиотеки
import { NavLink } from 'react-router-dom';

// хуки
import { useAuthState, useAuthActions } from '../../context/Auth/Auth-context';



const Navbar = () => {
    const { isLogged } = useAuthState(); // Залогинен ли
    const { logout } = useAuthActions(); // Выйти

    const onLogout = () => {
        logout();
    }


    return (
        <nav className='navbar navbar-dark bg-dark'>
            <div className='navbar-brand'>
                <NavLink to='/' className='text-decoration-none'>
                    МОИКТ
                </NavLink>
            </div>
            <ul className="nav justify-content-end">
                {isLogged &&
                    <li className="nav-item">
                        <NavLink className="nav-link"
                            to='/profile'>Profile</NavLink>
                    </li>}
                <li className="nav-item">
                    <NavLink className="nav-link" to='/news'>News</NavLink>
                </li>
                <li className="nav-item shadow-lg rounded-pill ">
                    {!isLogged
                        ? <NavLink className="nav-link " to='/login'>Login</NavLink>
                        : <NavLink className='nav-link' to='#' onClick={onLogout}>Logout</NavLink>
                    }
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;