import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";

const persistConfig = {
    key: 'root',
    storage
} 

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {
    store,
    persistor
}