import React from 'react';

// Хуки
import { useEffect, useState } from 'react';
import { useProfileActions, useProfileState } from '../../../context/Profile/Profile-context';
import { useAuthState } from '../../../context/Auth/Auth-context';

// Компоненты
import ProfileContent from '../../../components/ProfileContent/ProfileContent';

//Библиотеки
import { Redirect } from 'react-router-dom';

// Common - файлы
import Preloader from '../../../common/Preloader/Preloader';
import Error from '../../../common/Error';


const Profile = (props) => {

    const { id } = useAuthState();
    const [profileId, setProfileId] = useState(props.match.params.id ? props.match.params.id : id)
    const { getProfileInfo } = useProfileActions();
    const { profileData, errors } = useProfileState();
    const { isLogged } = useAuthState();
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true)
        if(profileId & isLogged){
            getProfileInfo(profileId)
            .then(() => {
                setIsFetching(false)
            })
        }else{
            setProfileId(id) // Форс апдейта
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!!errors) return <Error error={errors} button={'Вернуться'} />
    if (isLogged === false)return <Redirect to='/login' />
    if (isFetching) return <Preloader />


    return <ProfileContent profileData={profileData} /> // Если всё в порядке - грузим информацию
 


}

export default Profile;