import { SET_LOADING, POST_AUTH} from "../actions/Auth";

const initialState = {
    loading: false,
    data: [],
    error: false
}

const Auth = (state = initialState, {type,payload}) => {
    switch(type){
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case POST_AUTH:
            return {
                ...state,
                loading: false,
                data: payload,
            }
        default: 
            return state
    }
}

export default Auth;