import React from 'react';

// Библиотеки
import { NavLink } from 'react-router-dom';

// Словарик с ошибками
import { errors } from '../utils/ErrorList';


const Error = ({ error, button }) => {

    const defaultProps = {
        button: null, // по дефолту кнопки нет
        error: 'page_not_found' // и ошибка следующая
    }

    button = button ? button : defaultProps.button; // если не передали в пропсax
    error = error ? error : defaultProps.error

    return (
        <div style={{ textAlign: 'center' }}>
            <div className="alert alert-danger" role="alert">
                Ошибка!
                <div>
                    {errors[error]} {/* Находим ошибку в словаре */}
                </div>
                {button && // Если кнопка есть, то отрисовать
                    <NavLink to='/news'>
                        <button className='btn btn-danger btn-sm'>
                            {button}
                        </button>
                    </NavLink>

                }
            </div>
        </div>
    );
}

export default Error;