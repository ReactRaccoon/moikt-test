

export const reducer = (state,action) => {
    switch (action.type){
        case 'SUCCESS_IS_LOGGED':
            return {
                ...state,
                isLogged: true,
                id: action.payload,
                error: null
            }
        
        case 'ERROR_IS_LOGGED':
            return{
                ...state,
                error: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                isLogged: false,
                id: null,
                error: null,
            }
        case 'TOGGLE_FETCHING':
            return {
                ...state,
                isFetching: !state.isFetching
            }
        default:
            return state;
    }
}