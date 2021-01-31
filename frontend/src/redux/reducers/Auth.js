import { SET_LOADING, LOGIN_SUCCESS, REGISTER_SUCCESS, ERROR, LOGOUT} from "../actions/Auth";

const initialState = {
    loading: false,
    data: [],
    errors: []
}

const Auth = (state = initialState, {type,payload,error}) => {
    switch(type){
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
                errors: []
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
                errors: []
            }
        case LOGOUT:
            return {
                ...state,
                loading: false,
                data: [],
                errors: [],
                _persist: {
                    rehydrated: true,
                    version: -1
                }
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                data: [],
                errors: error
            }
        default: 
            return state
    }
}

export default Auth;