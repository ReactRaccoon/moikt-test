import React from 'react'

// Common - файл
import Title from '../../common/Title';


const Home = () => {
    return ( 
        <div className='col-8 offset-2 shadow border rounded w-100'>
            <Title text={'Главная'}/>
            <hr className="col-4 w-100"/>
            <div>
                <div>
                    <p>Тестовое задание на должность: <span className='font-weight-bold'>Frontend - разработчик</span></p>
                    <p>Выполнено для: <span className='font-weight-bold'>МОИКТ</span></p>
                    <p>Выполнил: <span className='font-weight-bold'>Воробьёв Вадим</span></p>
                </div>
            </div>
        </div>
     );
}
 
export default Home;