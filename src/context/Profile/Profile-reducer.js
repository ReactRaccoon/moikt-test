



export const reducer = (state,action) => {
    switch (action.type) {
        case 'SUCCESS_INIT_DATA':
            return{
                ...state,
                profileData: {
                    ...action.payload,
                    languages:[
                        ...action.payload.languages
                    ],
                    social:[
                        ...action.payload.social
                    ],
                    errors: null
                }
            }
        case 'ERROR_INIT_DATA':
            return {
                ...state,
                errors: action.payload
            }

        default:
            return state
    }
}