import { fork } from "redux-saga/effects";

import { postAuthWatcher } from "./auth-saga";

export default function* rootSaga(){
    console.log("hello from redux saga");
    yield fork(postAuthWatcher);
}