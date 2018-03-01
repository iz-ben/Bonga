import {WHATS_ON_YOUR_MIND} from "../constants";

export const SELECT_EDITOR = 'bonga/SELECT_EDITOR';
export const TYPE_TEXT = 'bonga/TYPE_TEXT';
export const CLOSE_EDITOR = 'bonga/CLOSE_EDITOR';
export const SUBMIT_SHARE = 'bonga/SUBMIT_SHARE';
export const SUBMIT_SHARE_SUCCESS = 'bonga/SUBMIT_SHARE_SUCCESS';
export const SUBMIT_SHARE_ERROR = 'bonga/SUBMIT_SHARE_ERROR';
export const FETCH_SHARES = 'bonga/FETCH_SHARES';
export const FETCH_SHARES_SUCCESSFUL = 'bonga/FETCH_SHARES_SUCCESSFUL';
export const FETCH_SHARES_ERROR = 'bonga/FETCH_SHARES_ERROR';

const initialState = {
    editorActive:false,
    editorContent:'',
    replyTo:null,
    placeholder:WHATS_ON_YOUR_MIND,
    shares:[]
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SELECT_EDITOR:
            return {
                ...state,
                editorActive: true
            };

        case CLOSE_EDITOR:
            return {
                ...state,
                editorActive: false
            };

        case TYPE_TEXT:
            return {
                ...state,
                editorContent:action.content
            };

        default:
            //console.log(state)
            return state
    }
}

export const fetchShares = ( page = 1 ) => {
    return dispatch => {
        dispatch({
            type: FETCH_SHARES,
            page:page
        });
    }
};

export const fetchSharesSuccessful = ( shares ) => {
    return dispatch => {
        dispatch({
            type: FETCH_SHARES_SUCCESSFUL,
            data:shares
        });
    }
};

export const fetchSharesError = ( error ) => {
    return dispatch => {
        dispatch({
            type: FETCH_SHARES_ERROR,
            error:error
        });
    }
};

export const typeText = ( text ) => {
    return dispatch => {
        dispatch({
            type: TYPE_TEXT,
            content:text
        });
    }
};


export const selectEditor = () => {
    return dispatch => {
        dispatch({
            type: SELECT_EDITOR
        });
    }
};


export const closeEditor = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_EDITOR
        });
    }
};