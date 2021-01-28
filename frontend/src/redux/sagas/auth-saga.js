import { 
    put, 
    call, 
    takeLatest, 
} from "redux-saga/effects";

import { 
    SET_LOADING, 
    POST_AUTH, 
    POST_AUTH_REQUESTED,
} from "../actions/Auth";

import { postAuth } from "../api/Auth";

function* postLogin(){
    yield put({type: SET_LOADING});

    const auth = yield call(postAuth);
    
    yield put({type: POST_AUTH, payload: auth});
}

export default function* authSaga(){
    yield takeLatest(POST_AUTH_REQUESTED, postLogin);
}