import { 
    put, 
    call, 
    takeLatest, 
} from "redux-saga/effects";

import { 
    SET_LOADING, 
    POST_AUTH, 
} from "../actions/Auth";

import { postAuth } from "../api/Auth";

function* postLogin(action){
    yield put({type: SET_LOADING});

    const auth = yield call(postAuth, action.payload);
    
    yield put({type: POST_AUTH, payload: auth});
}

export function* postAuthWatcher(){
    yield takeLatest(POST_AUTH, postLogin);
}