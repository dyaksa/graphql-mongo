import { spawn } from "redux-saga/effects";

import authSaga from "./auth-saga";

export default function* rootSaga(){
    console.log("hello from redux saga");
    yield spawn(authSaga);
}