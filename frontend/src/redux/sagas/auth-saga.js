import { 
    put, 
    call, 
    takeLatest,
} from "redux-saga/effects";

import { 
    SET_LOADING,
    AUTH_REQUESTED, 
    AUTH_SUCCESS,
} from "../actions/Auth";

import { postAuth } from "../api/Auth";

function* postLogin(action){
    yield put({type: SET_LOADING});
    const auth = yield call(postAuth, action.payload);
    yield put({type: AUTH_SUCCESS, payload: auth});
}

export function* postAuthWatcher(){
    yield takeLatest(AUTH_REQUESTED, postLogin);
}