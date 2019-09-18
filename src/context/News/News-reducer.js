
export const reducer = (state, action) => {
    switch (action.type) {
        case 'SUCCESS_GET_NEWS':
            return{
                ...state,
                news:[
                    ...action.payload
                ]
            }
        case 'ERROR_GET_NEWS':
            return{
                ...state,
                errors: action.payload
            }


        default:
            return state;
    }


}