//       Библиотеки
import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom';

//        Контекст
import { useAuthActions, useAuthState } from '../../context/Auth/Auth-context';

//       Common - элементы
import Error from '../../common/Error';
import Title from '../../common/Title';

//            Стили
import './Login.scss'



const Login = () => {

    const reg = /.+@.+\..+/i; // email validation Regex

    const { login } = useAuthActions(); // функция входа
    const { error,id } = useAuthState(); // сообщение об ошибке и id пользователя
    const [isValid, setIsValid] = useState(true); // Валидация форм
    const [isFetching, setIsFetching] = useState(false) // Состояние для лоадера
    const [successLogin, setSuccesslogin] = useState(false) // Флаг об успешном входе

    const emailRef = useRef(); //
    const passRef = useRef(); // Рефы на поля формы


    const onSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true);        
        validateMail(emailRef.current.value);

        if (isValid) { 
            const response = await login(
                emailRef.current.value,
                passRef.current.value);
            if (response.status === 'ok') {
                setIsFetching(false);
                setSuccesslogin(true)
            }
            if (response.status === 'err') {
                setIsFetching(false)
            }
        }

    }

    const validateMail = (email) => {
        if (reg.test(email)) {
            setIsValid(true)
        } else {
            setIsValid(false)
            setIsFetching(false)
        }
    }


    if (successLogin) return <Redirect to={`/profile/${id}`} />


    return (
        <div>
            <Title text='Авторизация' />
            {error &&
                <Error error={error} />
            }
            
            <form onSubmit={onSubmit} className='col-6 offset-3'>
                <div className="form-group">
                    <label htmlFor="Email">Email address</label>
                    <input
                        ref={emailRef}
                        type="email"
                        className={!isValid ? 'form-control invalid text-center' : 'form-control text-center'}
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter your email..."

                    />
                    <small id="emailHelp" className="form-text text-muted">Мы никогда не расскажем о вашей почте.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input
                        ref={passRef}
                        type="password"
                        className="form-control text-center"
                        id="password"
                        placeholder="Enter your password..."
                    />
                </div>
                <div className='d-flex flex-row-reverse'>
                    <button
                        type="submit"
                        className="btn btn-primary d-flex justify-content-end    "
                        disabled={isFetching}
                    >
                        {isFetching
                            ? <span>Wait...</span>
                            : <span>Submit</span>
                        }
                    </button>       
                </div>

            </form>
        </div>
    );
}

export default Login;