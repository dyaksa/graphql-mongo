import { SET_LOADING, AUTH_SUCCESS} from "../actions/Auth";

const initialState = {
    loading: false,
    data: [],
}

const Auth = (state = initialState, {type,payload}) => {
    switch(type){
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case AUTH_SUCCESS:
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