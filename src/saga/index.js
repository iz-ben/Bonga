import { call, put, takeLatest } from 'redux-saga/effects';

import request from '../utils/request'

import {FETCH_SHARES, fetchSharesSuccessful, SUBMIT_SHARE} from "../modules/bonga";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchShares(action) {
    try {
        const requestURL = `https://example.com/api`;
        const data = yield call(request, requestURL);
        yield put(fetchSharesSuccessful(data));
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}


/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
    yield takeLatest(FETCH_SHARES, fetchShares);
}

export default mySaga;