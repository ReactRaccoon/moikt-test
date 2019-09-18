import React from 'react'

const NewsItem = ({ item }) => {

    const defaultProps = {
        item: {
            title: 'Пока новостей нет',
            text: ' Следите за нами всегда ',
            id: 0,
        }
    }

    if(!item){
        item = defaultProps.item;
    }

    return (
        <div className='col-12 bg-li w-100 shadow-lg p-3 bg-white rounded mb-3 '>
            <h5 className='col-8 offset-2 d-flex justify-content-center '>
                {item.title}
            </h5>
            <hr className='my-1' />
            <div className='col-10 offset-1 d-flex justify-content-center text-muted'>
                {item.text}
            </div>
        </div>
    );
}


export default NewsItem;