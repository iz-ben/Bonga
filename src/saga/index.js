import { call, put, takeLatest } from 'redux-saga/effects';

import request from '../utils/request'

import {FETCH_SHARES, fetchSharesError, fetchSharesSuccessful} from "../modules/bonga";
import {COMMENTS_API_ENDPOINT} from "../constants";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchShares() {
    try {
        const requestURL = COMMENTS_API_ENDPOINT;
        const response = yield call(request, requestURL);
        const {data} = response;
        console.log(data);
        yield put(fetchSharesSuccessful(data));
    } catch (e) {
        yield put(fetchSharesError(e.message));
    }
}


/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/

/**
 * Root saga manages watcher lifecycle
 */
export default function* shareData() {
    yield takeLatest(FETCH_SHARES, fetchShares);
}