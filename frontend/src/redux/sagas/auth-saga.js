import { 
    put, 
    call, 
    takeLatest,
} from "redux-saga/effects";

import { 
    SET_LOADING,
    LOGIN_REQUESTED, 
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_REQUESTED,
    ERROR
} from "../actions/Auth";

import { postAuth, postRegister } from "../api/Auth";

function* postLogin(action){
    yield put({type: SET_LOADING});
    const auth = yield call(postAuth, action.payload);
    yield put({type: LOGIN_SUCCESS, payload: auth});
}

function* authRegister(action){
    yield put({type: SET_LOADING});
    try {
        const regist = yield call(postRegister, action.payload);
        yield put({type: REGISTER_SUCCESS, payload: regist});
    }catch(err){
        yield put({type: ERROR, error: err });
    }
}

export function* postAuthWatcher(){
    yield takeLatest(LOGIN_REQUESTED, postLogin);
    yield takeLatest(REGISTER_REQUESTED, authRegister);
}