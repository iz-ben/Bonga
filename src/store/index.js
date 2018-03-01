import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import createReducer from "../modules";
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import mySaga from '../saga'

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancers = [];
const middleware = [
    sagaMiddleware,
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
    offline(offlineConfig),
);

const store = createStore(
    createReducer(),
    initialState,
    composedEnhancers
);


store.injectedReducers = {}; // Reducer registry

sagaMiddleware.run(mySaga);


export default store