
import React from 'react';

// Инициализатор картинок 
import { images } from '../../utils/images';

// Common - файлы
import Title from '../../common/Title';

const ProfileContent = ({ profileData }) => {
    return (
        <div>
            {profileData &&
                <>
                    <Title text='Профиль' />
                    <div className="jumbotron shadow">
                        <div className="lead">
                            <ul className="list-group list-group-horizontal-sm">
                                <li className="list-group-item list-group-item-action list-group-item-secondary">
                                    Город: <span className='font-weight-bold'
                                    >{profileData.city ? profileData.city : 'Неизвестно'}</span>
                                </li>
                                <li className="list-group-item list-group-item-action list-group-item-secondary">
                                    Языки: {profileData.languages
                                        ? profileData.languages.map(lang => (
                                            <span className='d-inline p-1 bg-light shadow-sm border rounded-pill' key={lang}>
                                                {lang}
                                            </span>
                                        ))
                                        : 'Неизвестно'}
                                </li>
                            </ul>
                            <hr className="my-4" />
                            {profileData.social &&
                                profileData.social.length > 0 &&
                                <>
                                    <p>Ссылки:</p>
                                    <div className="list-group list-group-horizontal">
                                        {
                                            profileData.social
                                                .reduce((arr, soc) => (
                                                    soc.label === 'web' ? [soc, ...arr] : [...arr, soc] // перемещение 'web' в начало массива
                                                ), [])
                                                .map(soc => ( // Пробегаемся по массиву
                                                    <span className='d-flex justify-content-start ml-3' key={soc.label}>
                                                        <a href={soc.link}>
                                                            <img
                                                                src={`${images[soc.label]}`} // получаем картинки с инициализатора
                                                                width="30"
                                                                height="30"
                                                                title={soc.label}
                                                                alt={soc.label}
                                                            />
                                                        </a>
                                                    </span>
                                                    //А сюда лучше не смотреть

                                                ))
                                        }
                                    </div>
                                </>
                            }
                        </div>

                    </div>
                </>
            }

        </div>
    );
}

export default ProfileContent;