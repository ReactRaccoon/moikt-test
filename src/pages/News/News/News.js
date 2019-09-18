import React from 'react';

// Хуки
import { useLayoutEffect, useState } from 'react';
import { useNewsActions, useNewsState } from '../../../context/News/News-context';

// Компоненты
import NewsItem from '../../../components/NewsItem/NewsItem';

// Common - файлы
import Preloader from '../../../common/Preloader/Preloader';
import Error from '../../../common/Error';
import Title from '../../../common/Title';



const News = () => {
    const { getNews } = useNewsActions(); // request
    const { news, errors } = useNewsState(); // список с новостями и ошибки

    const [isFetching, setIsFetching] = useState(false);

    useLayoutEffect(() => { // Запускается в фазе с cDM
        setIsFetching(true);
        getAllNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAllNews = async () => {
        await getNews()
            .then(() => setIsFetching(false));
    }

    if (isFetching !== false) return <Preloader />
    if (!!errors) return <Error message={errors} />

    return (
        <div>
            <Title text='Новости' />
            {news.map((item) => {
                return (
                    <NewsItem item={item} key={item.id} />
                )
            })}
            <div>
                Новостей: {news.length}
            </div>
        </div>
    );
}

export default News;