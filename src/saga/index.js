import { call, put, takeLatest } from 'redux-saga/effects';

import request from '../utils/request'

import {
    FETCH_SHARES, fetchSharesError, fetchSharesSuccessful, SUBMIT_REPLY, SUBMIT_STORY, submitStoryError,
    submitStorySuccess
} from "../modules/bonga";
import {POST_STORY_API_ENDPOINT} from "../constants";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchShares({url}) {
    try {
        const response = yield call(request, url);
        yield put(fetchSharesSuccessful(response));
    } catch (e) {
        yield put(fetchSharesError(e.message));
    }
}

function* submitStory({content, recaptcha}) {
    //console.log(recatpcha)
    try {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('recaptcha', recaptcha);
        const response = yield call(request, POST_STORY_API_ENDPOINT,{method: 'POST',body:formData});
        const {data} = response;
        //console.log(data);
        yield put(submitStorySuccess(data));
    } catch (e) {
        yield put(submitStoryError(e.message));
    }
}

function* submitReply({content, recaptcha, in_reply_to}) {
    //console.log(recatpcha)
    try {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('recaptcha', recaptcha);
        formData.append('in_reply_to', in_reply_to);

        const response = yield call(request, POST_STORY_API_ENDPOINT,{method: 'POST',body:formData});
        const {data} = response;
        //console.log(data);
        yield put(submitStorySuccess(data));
    } catch (e) {
        yield put(submitStoryError(e.message));
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
export default function* storyData() {
    yield [
        takeLatest(FETCH_SHARES, fetchShares),
        takeLatest(SUBMIT_STORY, submitStory),
        takeLatest(SUBMIT_REPLY, submitReply)
    ];
}